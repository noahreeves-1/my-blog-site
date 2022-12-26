import { Response, Request, NextFunction } from "express";
import { Post } from "../models/post";

export const index_get = (req: Request, res: Response, next: NextFunction) => {
  Post.find()
    .populate("author")
    .exec((err, allPosts) => {
      if (err) return next(err);

      res.json({
        posts: allPosts,
        user: req.user,
      });
    });
};

export const about_get = (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
};

export const contact_get = (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
};
