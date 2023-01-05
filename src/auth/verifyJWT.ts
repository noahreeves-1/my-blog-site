import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (typeof authHeader !== "string") {
    return res
      .status(400)
      .json({ message: "req.headers.Authorization is not type String" });
  }

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); // Unauthorized
  console.log(authHeader); // Bearer token

  const token = authHeader.split(" ")[1];

  // * trying this
  interface MyToken {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    admin: boolean;
    roles: string[];
  }

  const decodedToken: unknown = jwt.verify(
    token,
    `${process.env.ACCESS_SECRET_KEY}`
  );

  // ? extra check... needed in legit prod but not necessary here
  function verifyDecodedToken(data: unknown): asserts data is MyToken {
    // verify decoded token is an Object
    if (!(data instanceof Object)) {
      throw new Error("Decoded token error. Token must be an object");
    }
    // verify "username" is in decoded token
    if (!("username" in data)) {
      throw new Error("Decoded token error. Missing required field `username`");
    }
  }

  verifyDecodedToken(decodedToken);

  req.user = {
    username: decodedToken.username,
    first_name: decodedToken.first_name,
    last_name: decodedToken.last_name,
    email: decodedToken.email,
    admin: decodedToken.admin,
    roles: decodedToken.roles,
  };

  next();
};
