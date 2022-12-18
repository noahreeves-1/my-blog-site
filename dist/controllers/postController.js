"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_post_post = exports.create_post_get = void 0;
const express_validator_1 = require("express-validator");
const post_1 = require("../models/post");
const create_post_get = (req, res) => {
    res.render("post_form", {
        title: "Create New Post",
        user: req.user,
    });
};
exports.create_post_get = create_post_get;
exports.create_post_post = [
    (0, express_validator_1.body)("title", "Title must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("content", "Content must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render("/posts/create", {
                title: "Create Post",
                content: req.body.content,
            });
        }
        const newPost = new post_1.Post({
            title: req.body.title,
            content: req.body.content,
            date_created: Date.now(),
            author: req.user,
        });
        newPost.save((err) => {
            if (err)
                return next(err);
            res.redirect("/");
        });
    },
];
//# sourceMappingURL=postController.js.map