import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Post, IPost } from "../models/post";
import { Comment } from "../models/comment";
import { HydratedDocument } from "mongoose";
import { IUser, User } from "../models/user";

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

          return res.status(200).json({ post, comments });
        });
    });
};

export const create_post_get = (req: Request, res: Response) => {
  res.status(200).json({ message: "create_post_get" });
};

export const create_post_post = [
  body("title", "Title must not be empty.").trim().isLength({ min: 1 }),
  body("content", "Content must not be empty.").trim().isLength({ min: 1 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Errors array in create_post_post is not empty" });
    }

    User.findOne(
      { username: req.user?.username },
      (err: Error, foundUser: IUser) => {
        if (err) {
          return next(err);
        }

        const newPost: HydratedDocument<IPost> = new Post({
          title: req.body.title,
          content: req.body.content,
          date_created: Date.now(),
          author: foundUser,
        });

        newPost.save((err) => {
          if (err) return next(err);
          return res.status(200).json({ message: "New post created!" });
        });
      }
    );
  },
];
