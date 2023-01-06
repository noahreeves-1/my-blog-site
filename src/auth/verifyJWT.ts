import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import { VerifyErrors, Jwt } from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  console.log("1 One - authHeader exists in header " + authHeader);

  // * Check to see if typeof string
  const authHeaderString = authHeader?.toString();
  if (typeof authHeaderString !== "string") {
    console.error("2 Two - authHeader not typeof string" + authHeaderString);
    return res
      .status(401)
      .json({ message: "req.headers.authorization is not type String" });
  }

  // * Check to see if starts with Bearer
  if (!authHeaderString.startsWith("Bearer ")) {
    console.log(
      "3 Three - authHeaderString does not start with Bearer  " +
        authHeaderString
    );
    return res.sendStatus(401); // Unauthorized
  }

  // * OK - All checks passed!
  console.log(
    "OK - 4 Four - authHeaderString exists and is of type string " +
      authHeaderString
  ); // Bearer token

  const token = authHeaderString.split(" ")[1];
  // const token2 = "fbfd";

  jwt.verify(
    token,
    `${process.env.ACCESS_SECRET_KEY}`,
    { complete: true },
    (err: VerifyErrors | null, decoded: Jwt | undefined) => {
      if (err) return res.sendStatus(403); // unauthorized

      // * jwtObject = {
      // *   header: "fdjsljfds",
      // *   payload : "fdsfdsa",
      // *   signature: "fdsfds"
      // * }

      if (!decoded) {
        throw new Error("Decoded object is undefined");
      }

      if (typeof decoded?.payload === "string") {
        const decodedObject = JSON.parse(decoded.payload) as MyToken;

        req.user = {
          username: decodedObject.username,
          first_name: decodedObject.first_name,
          last_name: decodedObject.last_name,
          email: decodedObject.email,
          admin: decodedObject.admin,
          roles: decodedObject.roles,
        };

        next();
      } else {
        // * decoded.payload is type Jwt.jwtPayload
        const payload = decoded?.payload;

        req.user = {
          username: payload?.username,
          first_name: payload?.first_name,
          last_name: payload?.last_name,
          email: payload?.email,
          admin: payload?.admin,
          roles: payload?.roles,
        };

        next();
      }
    }
  );

  // const decodedToken: unknown = jwt.verify(
  //   token,
  //   `${process.env.ACCESS_SECRET_KEY}`
  // );

  // req.user = {
  //   username: decodedToken.username,
  //   first_name: decodedToken.first_name,
  //   last_name: decodedToken.last_name,
  //   email: decodedToken.email,
  //   admin: decodedToken.admin,
  //   roles: decodedToken.roles,
  // };
};

// * trying this
interface MyToken {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  admin: boolean;
  roles: string[];
}

// TODO - none of this works
// interface decodedJwt extends Jwt {
//   header: JwtHeader;
//   payload: MyToken;
//   signature: string;
// }

// interface decodedJwtPayload extends JwtPayload {
//   headers: string;
//   payload: string;
//   signature: string;
// }

// function isJwtPayload(jwt: JwtPayload | string): jwt is JwtPayload {
//   return ((jwt as JwtPayload) === true);
// }

// const isJwtPayload2 = (theJwt:any) theJwt is Jwt => {
//   jwt.includes(theJwt)
// }

// // ? extra check... needed in legit prod but not necessary here
// function verifyDecodedToken(data: unknown): asserts data is MyToken {
//   // verify decoded token is an Object
//   if (!(data instanceof Object)) {
//     throw new Error("Decoded token error. Token must be an object");
//   }
//   // verify "username" is in decoded token
//   if (!("username" in data)) {
//     throw new Error("Decoded token error. Missing required field `username`");
//   }
// }
