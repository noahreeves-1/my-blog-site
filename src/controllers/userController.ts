//* downloaded modules
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//* custom modules
import { User, IUser } from "../models/user";
// import { IUserRequest } from "../types";

//* LOG IN

// export const login_post = passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/users/login",
//   failureMessage: "Username or password is incorrect",
// });

export const login_get = (req: Request, res: Response) => {
  res.json({
    user: req.user,
    test: "hello",
  });
};

export const login_post = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong...",
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    }

    req.login(user, async (err) => {
      // * LOGIN FAILED
      if (err) {
        res.send(err);
      }

      // * LOGIN SUCCESSFUL
      // generate a signed json web token with the contents of the user object
      // and return it in the response
      const payload = {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        admin: user.admin,
      };

      const accessToken = jwt.sign(
        payload,
        `${process.env.ACCESS_SECRET_KEY}`,
        {
          expiresIn: "10m",
        }
      );

      const refreshToken = jwt.sign(
        payload,
        `${process.env.REFRESH_SECRET_KEY}`,
        {
          expiresIn: "1d",
        }
      );

      const filter = { username: user.username };
      const update = { refresh_token: refreshToken };

      // hello
      // * update refresh token with created refresh token
      // TODO - problem here
      await User.findOneAndUpdate(filter, update);

      res
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        })
        .json({ accessToken });
    });
  })(req, res, next);
};

export const logout_get = (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

//* SIGN UP
export const user_signup_get = (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
};

export const user_signup_post = [
  body("first_name", "First name must be at least 2 characters in length")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("last_name", "Last name must be at least 2 characters in length")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("username", "Username must be at least 3 characters in length")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("email", "Email must be formatted correctly")
    .trim()
    .isLength({ min: 8 })
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("password", "Please enter a valid password")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("confirm_password", "Passwords must match")
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log({ errors: errors.array() });

    // there's an error
    if (!errors.isEmpty()) {
      return res.render("user_form", {
        title: "Create User",
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        errors: errors.array(),
        user: req.user,
      });
    }

    bcrypt.hash(
      req.body.password,
      10,
      (err: Error | undefined, hashedPassword: string) => {
        if (err) return next(err);

        // no validation errors
        // search db for username
        User.findOne(
          { username: req.body.username },
          (err: Error, user: IUser) => {
            if (err) return next(err);
            if (user) {
              return res.status(409).json({
                message: `Username: ${user.username} already exists`,
              });
              // return res.render("user_form", {
              //   title: "Create User",
              //   first_name: req.body.first_name,
              //   last_name: req.body.last_name,
              //   username: req.body.username,
              //   email: req.body.email,
              //   message: `Username: ${user.username} found`,
              // });
            }
            // no username found with same username
            // search db for email
            User.findOne(
              { email: req.body.email },
              (err: Error, user: IUser) => {
                if (err) return next(err);
                if (user) {
                  return res.status(409).json({
                    message: `Email: ${user.email} already exists`,
                  });
                  // return res.render("user_form", {
                  //   title: "Create User",
                  //   first_name: req.body.first_name,
                  //   last_name: req.body.last_name,
                  //   username: req.body.username,
                  //   email: req.body.email,
                  //   message: "Email already exists",
                  // });
                }
                // no email found with same email
                const newUser: HydratedDocument<IUser> = new User({
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  username: req.body.username,
                  email: req.body.email,
                  password: hashedPassword,
                  admin: false,
                  refresh_token: "",
                });

                newUser.save((err) => {
                  if (err) {
                    return next(err);
                  }
                  return res.json({ message: "User created!", user: newUser });
                });

                return;
              }
            );
          }
        );
      }
    );
  },
];

export const admin_code_get = (req: Request, res: Response) => {
  return res.json({ success: "You've been verified!" });
  res.render("admin_code", {
    title: "Enter Code",
  });
};

export const admin_code_post = [
  body("admin_code", "Wrong code buddy")
    .trim()
    .escape()
    .custom((value: string) => {
      if (value !== process.env.ADMIN_CODE) {
        throw new Error("Admin code is incorrect");
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("admin_code", {
        title: "Enter Code",
        errors: errors.array(),
        user: req.user,
      });
      return;
    }

    if (req.user) {
      User.findOneAndUpdate(
        { username: req.user.username },
        { admin: true },
        (err: Error, user: IUser) => {
          if (err) return next(err);

          res.render("index", {
            title: "Welcome",
            user,
          });
        }
      );
    }
  },
];
