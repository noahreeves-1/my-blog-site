import { Request, Response } from "express";
import { IUser, User } from "../models/user";

export const handleLogout = (req: Request, res: Response) => {
  // TODO on client, also delete the access token
  const cookies = req.cookies;
  console.log(cookies);

  if (!cookies?.refresh_token) return res.sendStatus(204); // No content to send

  const refreshToken = cookies.refresh_token;

  // Is refresh token in db?
  User.findOneAndUpdate(
    { refresh_token: refreshToken },
    { refresh_token: "" },
    (err: Error, foundUser: IUser) => {
      if (err) {
        return res.json(err);
      }

      if (!foundUser) {
        res.clearCookie("refresh_token", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.sendStatus(204);
      }

      res
        .clearCookie("refresh_token", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(204)
        .json({ updated_user: foundUser });
    }
  );
};
