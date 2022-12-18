import { Response, Request, NextFunction } from "express";
import { Post } from "../models/post";

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
