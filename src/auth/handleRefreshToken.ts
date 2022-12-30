import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/user";
dotenv.config();

interface MyToken {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  admin: boolean;
}

export const handleRefreshToken = (req: Request, res: Response) => {
  const cookies = req.cookies;

  console.log(cookies);

  if (!cookies?.refresh_token) return res.sendStatus(401); // Unauthorized

  const refreshToken = cookies.refresh_token;

  User.findOne(
    { refresh_token: refreshToken },
    (err: Error, foundUser: IUser) => {
      if (err) {
        res.json(err);
      }

      if (!foundUser) {
        res.sendStatus(403); // Forbidden
      }

      // ! YouTube method: Dave Gray
      jwt.verify(refreshToken, `${process.env.REFRESH_SECRET_KEY}`),
        (err: unknown, decoded: MyToken) => {
          if (err) {
            return res.sendStatus(403);
          }

          if (err || foundUser.username !== decoded.username) {
            return res.sendStatus(403);
          }

          const payload = {
            username: decoded.username,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            admin: decoded.admin,
          };

          const accessToken = jwt.sign(
            payload,
            `${process.env.ACCESS_SECRET_KEY}`,
            {
              expiresIn: "10m",
            }
          );

          res.json({ accessToken });
        };
    }
  );
};

//   const decodedToken: unknown = jwt.verify(
//     refreshToken,
//     `${process.env.REFRESH_SECRET_KEY}`
//   );

//   // ? extra check... needed in legit prod but not necessary here
//   function verifyDecodedToken(data: unknown): asserts data is MyToken {
//     // verify decoded token is an Object
//     if (!(data instanceof Object)) {
//       throw new Error("Decoded token error. Token must be an object");
//     }
//     // verify "username" is in decoded token
//     if (!("username" in data)) {
//       throw new Error("Decoded token error. Missing required field `username`");
//     }
//     // verify same "username"
//     if (data.username !== foundUser.username) {
//       throw new Error("Usernames do not match");
//     }
//   }

//   verifyDecodedToken(decodedToken);
