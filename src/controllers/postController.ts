import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Post, IPost } from "../models/post";
import { Comment } from "../models/comment";
import { HydratedDocument } from "mongoose";

export const create_post_get = (req: Request, res: Response) => {
  res.status(200);
};

export const create_post_post = [
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("/posts/create", {
        title: "Create Post",
        content: req.body.content,
      });
    }

    const newPost: HydratedDocument<IPost> = new Post({
      title: req.body.title,
      content: req.body.content,
      date_created: Date.now(),
      author: req.user,
    });

    newPost.save((err) => {
      if (err) return next(err);

      res.redirect("/");
    });
  },
];

export const get_post_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Post.findById(req.params.id)
    .populate("author")
    .exec((err, post) => {
      if (err) return next(err);

      Comment.find({ blogPost: req.params.id })
        .populate("author")
        .exec((err, comments) => {
          if (err) return next(err);

          res.render("post_details", {
            title: "Post Details",
            post,
            comments,
            user: req.user,
          });
        });
    });
};
