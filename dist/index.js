"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// * downloaded packages
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const express_session_1 = __importDefault(require("express-session"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// * import mongoose from "mongoose";
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// * custom modules
const logger_1 = require("./shared/classes/logger");
const error_handler_1 = require("./shared/classes/error-handler");
const user_1 = require("./models/user");
// * import routes from routes
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const posts_1 = __importDefault(require("./routes/posts"));
// * access variables from .env file(s)
dotenv_1.default.config();
// * setup database connection
const mongoDB = process.env.MONGODB_URI;
mongoose_1.default.connect(`${mongoDB}`);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
// * initialize Express app
const app = (0, express_1.default)();
const port = process.env.PORT;
// * set views engine
const viewsDir = path_1.default.join(__dirname, "../src/views");
app.set("views", viewsDir);
app.set("view engine", "pug");
//* set up PassportJs
passport_1.default.use(new passport_local_1.Strategy({ passReqToCallback: true }, (req, username, password, done) => {
    user_1.User.findOne({ username: username }, (err, user) => {
        if (err)
            return done(err);
        if (!user) {
            return done(null, false, {
                message: `User ${user[username]} not found.`,
            });
        }
        bcrypt_1.default.compare(password, user.password, (err, res) => {
            if (err)
                return done(err);
            if (res) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: "Incorrect password" });
            }
        });
    });
}));
//* Passport middleware
app.use((0, express_session_1.default)({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//* Serialize and deserialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    user_1.User.findById(user, (err, user) => {
        if (err)
            return done(err);
        done(null, user);
    });
});
// * speed up http delivery
app.use((0, compression_1.default)());
// * protect against well-known attacks
app.use((0, helmet_1.default)());
// * set up standard middleware for JSON, http, cookies, and static files
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
const staticDir = path_1.default.join(__dirname, "../src/public");
app.use(express_1.default.static(staticDir));
// * route middleware
app.use("/", index_1.default);
app.use("/users", users_1.default);
app.use("/posts", posts_1.default);
// * local user middleware
app.use((err, req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
// app.listen(port, () => {
//   console.log(`[server]: Server is running at https://localhost:${port}`);
// });
// ! ERROR HANDLING
app.use(errorMiddleware);
const errorHandler = new error_handler_1.ErrorHandler(logger_1.logger);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info(`Server is listening on port ${port}!`);
}));
process.on("uncaughtException", (error) => __awaiter(void 0, void 0, void 0, function* () {
    yield errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error))
        process.exit(1);
}));
process.on("unhandledRejection", (reason) => {
    throw reason;
});
function errorMiddleware(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!errorHandler.isTrustedError(err)) {
            next(err);
            return;
        }
        yield errorHandler.handleError(err);
    });
}
//# sourceMappingURL=index.js.map