//* downloaded modules
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { HydratedDocument } from "mongoose";
import passport from "passport";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

//* custom modules
import { User, IUser } from "../models/user";

import { IUserRequest } from "../types";

//* LOG IN
export const login_get = (req: Request, res: Response) => {
  res.render("log_in", {
    title: "Log In",
    user: req.user,
  });
};

// export const login_post = (req: Request, res: Response) => {
//   passport.authenticate("local", { session: false }, (err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         message: "Something is not right",
//         user,
//       });
//     }

//     req.login(user, { session: false }, (err) => {
//       if (err) {
//         res.send(err);
//       }

//       // generate a signed json web token witht he contents of the user object
//       // and return it in the response
//       const token = jwt.sign(user, "polar_bears");
//       return res.json({ user, token });
//     });
//   })(req, res);
// };

export const login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureMessage: "Username or password is incorrect",
});

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
  res.render("user_form", {
    title: "Create User",
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

    // there's an error
    if (!errors.isEmpty()) {
      res.render("user_form", {
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
              res.render("user_form", {
                title: "Create User",
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                message: `Username: ${user.username} found`,
              });

              return;
            }
            // no username found with same username
            // search db for email
            User.findOne(
              { email: req.body.email },
              (err: Error, user: IUser) => {
                if (err) return next(err);
                if (user) {
                  res.render("user_form", {
                    title: "Create User",
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    email: req.body.email,
                    message: "Email already exists",
                  });

                  return;
                }
                // no email found with same email
                const newUser: HydratedDocument<IUser> = new User({
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  username: req.body.username,
                  email: req.body.email,
                  password: hashedPassword,
                  admin: false,
                });

                newUser.save((err) => {
                  if (err) {
                    return next(err);
                  }
                  res.redirect("/");
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
  res.render("admin_code", {
    title: "Enter Code",
  });
};

export const admin_code_post = [
  body("admin_code", "Wrong code buddy")
    .trim()
    .escape()
    .custom((value: string) => {
      if (value !== process.env.SECRET_CODE) {
        throw new Error("Admin code is incorrect");
      }
      return true;
    }),
  (req: IUserRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("admin_code", {
        title: "Enter Code",
        errors: errors.array(),
        user: req.user,
      });
      return;
    }

    User.findOneAndUpdate(
      { username: req.user?.username },
      { admin: true },
      (err: Error, user: IUser) => {
        if (err) return next(err);

        res.render("index", {
          title: "Welcome",
          user,
        });
      }
    );
  },
];
