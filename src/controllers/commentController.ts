import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Comment } from "../models/comment";

export const comment_post = [
  body("commentBody", "Comment must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.redirect(`/posts/${req.params.id}`);
    }

    const newComment = new Comment({
      author: req.user,
      blogPost: req.params.id,
      commentBody: req.body.commentBody,
      date_created: Date.now(),
    });

    newComment.save((err) => {
      if (err) return next(err);

      Comment.find({ blogPost: req.params.id })
        .populate("author")
        .exec((err, comments) => {
          if (err) return next(err);

          return res.status(200).json({ comments, user: req.user });
        });
    });
  },
];
