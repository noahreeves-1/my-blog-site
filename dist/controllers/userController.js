"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin_code_post = exports.admin_code_get = exports.user_signup_post = exports.user_signup_get = exports.logout_get = exports.login_post = exports.login_get = void 0;
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//* custom modules
const user_1 = require("../models/user");
// import { body, validationResult } from "express-validator";
//* LOG IN
const login_get = (req, res) => {
    res.render("log_in", {
        title: "Log In",
        user: req.user,
    });
};
exports.login_get = login_get;
exports.login_post = passport_1.default.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureMessage: "Username or password is incorrect",
});
const logout_get = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
exports.logout_get = logout_get;
//* SIGN UP
const user_signup_get = (req, res) => {
    res.render("user_form", {
        title: "Create User",
        user: req.user,
    });
};
exports.user_signup_get = user_signup_get;
exports.user_signup_post = [
    (0, express_validator_1.body)("first_name", "First name must be at least 2 characters in length")
        .trim()
        .isLength({ min: 2 })
        .escape(),
    (0, express_validator_1.body)("last_name", "Last name must be at least 2 characters in length")
        .trim()
        .isLength({ min: 2 })
        .escape(),
    (0, express_validator_1.body)("username", "Username must be at least 3 characters in length")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    (0, express_validator_1.body)("email", "Email must be formatted correctly")
        .trim()
        .isLength({ min: 8 })
        .isEmail()
        .normalizeEmail()
        .escape(),
    (0, express_validator_1.body)("password", "Please enter a valid password")
        .trim()
        .isLength({ min: 8 })
        .escape(),
    (0, express_validator_1.body)("confirm_password", "Passwords must match")
        .trim()
        .escape()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords must match");
        }
        return true;
    }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
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
        bcrypt_1.default.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err)
                return next(err);
            // no validation errors
            // search db for username
            user_1.User.findOne({ username: req.body.username }, (err, user) => {
                if (err)
                    return next(err);
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
                user_1.User.findOne({ email: req.body.email }, (err, user) => {
                    if (err)
                        return next(err);
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
                    const newUser = new user_1.User({
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
                });
            });
        });
    },
];
const admin_code_get = (req, res) => {
    res.render("admin_code", {
        title: "Enter Code",
    });
};
exports.admin_code_get = admin_code_get;
exports.admin_code_post = [
    (0, express_validator_1.body)("admin_code", "Wrong code buddy")
        .trim()
        .escape()
        .custom((value) => {
        if (value !== process.env.SECRET_CODE) {
            throw new Error("Admin code is incorrect");
        }
        return true;
    }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render("admin_code", {
                title: "Enter Code",
                errors: errors.array(),
                user: req.user,
            });
            return;
        }
        next();
        // User.findOneAndUpdate(
        //   { username: req.user.username },
        //   { admin: true },
        //   (err: Error, user: IUser) => {
        //     if (err) return next(err);
        //     res.render("index", {
        //       title: "Welcome",
        //       user,
        //     });
        //   }
        // );
    },
];
//# sourceMappingURL=userController.js.map