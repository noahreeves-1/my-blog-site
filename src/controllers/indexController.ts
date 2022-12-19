import { Response, Request, NextFunction } from "express";
import { Post } from "../models/post";
import passport from "passport";
import jwt from "jsonwebtoken";

export const index_get = (req: Request, res: Response, next: NextFunction) => {
  Post.find()
    .populate("author")
    .exec((err, allPosts) => {
      if (err) return next(err);

      res.render("index", {
        title: "Welcome!",
        posts: allPosts,
        user: req.user,
      });
    });
};

export const about_get = (req: Request, res: Response) => {
  res.render("about", {
    title: "About Me",
    user: req.user,
  });
};

export const contact_get = (req: Request, res: Response) => {
  res.render("contact", {
    title: "Let's Connect",
    user: req.user,
  });
};

export const login_get = (req: Request, res: Response) => {
  res.render("log_in", {
    title: "Log In",
    user: req.user,
  });
};

export const login_post = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user,
      });
    }

    req.login(user, async (err) => {
      if (err) {
        res.send(err);
      }

      // generate a signed json web token witht he contents of the user object
      // and return it in the response
      const token = jwt.sign({ user }, `${process.env.SECRET_KEY}`, {
        expiresIn: "24h",
      });

      Post.find()
        .populate("author")
        .exec((err, allPosts) => {
          if (err) return next(err);

          res.render("index", {
            title: "Welcome!",
            posts: allPosts,
            user: req.user,
            token,
          });
        });
    });
  })(req, res, next);
};
