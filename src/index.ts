// * downloaded packages
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";

// * custom modules
import { logger } from "./shared/classes/logger";
import { ErrorHandler } from "./shared/classes/error-handler";
import { BaseError } from "./shared/classes/base-error";
import { IUser, User } from "./models/user";
import { verifyJWT } from "./auth/verifyJWT";

// * import routes from routes
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import adminRouter from "./routes/admin";
import refreshRouter from "./routes/refresh";
import logoutRouter from "./routes/logout";

// * access variables from .env file(s)
dotenv.config();

//* passportjs
import "./auth/passport";

// * setup MongoDB database connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(`${mongoDB}`);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// * initialize Express app
const app: Express = express();
const port: string | undefined = process.env.PORT;

// * set views engine
const viewsDir = path.join(__dirname, "../src/views");
app.set("views", viewsDir);
app.set("view engine", "pug");

//* Passport middleware
app.use(
  session({
    secret: `${process.env.SESSION_SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//* Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  User.findById(user, (err: Error, user: IUser) => {
    if (err) return done(err);
    done(null, user);
  });
});

// * speed up http delivery
app.use(compression());
// * protect against well-known attacks
app.use(helmet());

// * set up standard middleware for JSON, http, cookies, and static files
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const staticDir = path.join(__dirname, "../src/public");
app.use(express.static(staticDir));

// * local user middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.currentUser = req.user;
  next();
});

// * CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: [
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    ],
  })
);

app.options("*", cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

// * route middleware
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.use("/logout", logoutRouter);

// * refresh Token Route
app.use("/refresh", refreshRouter);

// * protected routes
app.use("/admin", verifyJWT, adminRouter);

// ! ERROR HANDLING
app.use(errorMiddleware);
const errorHandler = new ErrorHandler(logger);

app.listen(port, async () => {
  logger.info(`Server is listening on port ${port}!`);
});

process.on("uncaughtException", async (error: Error) => {
  await errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on("unhandledRejection", (reason: Error) => {
  throw reason;
});

async function errorMiddleware(
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
    return;
  }
  await errorHandler.handleError(err);
}
