import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/user";

export const handleLogout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO on client, also delete the access token
  const cookies = req.cookies;
  console.log(cookies);

  if (!cookies?.refresh_token) return res.sendStatus(204); // No content to send

  const refreshToken = cookies.refresh_token;

  req.logout((err) => {
    if (err) {
      return next(err);
    }

    // Is refresh token in db?
    User.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      (err: Error, foundUser: IUser) => {
        if (err) {
          return res.json(err);
        }

        if (!foundUser) {
          // * empty req.user
          req.user = undefined;

          return res
            .clearCookie("refresh_token", {
              httpOnly: true,
              sameSite: "none",
              secure: true,
            })
            .status(204)
            .json({
              message: "No user with this refreshToken. Cookie cleared.",
            });
        }

        // * empty req.user
        req.user = undefined;

        return res
          .clearCookie("refresh_token", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .status(204)
          .json({ message: "Cookie cleared." });
      }
    );
  });
};
