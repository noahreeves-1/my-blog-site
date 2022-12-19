import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User, IUser } from "../models/user";
import { Request } from "express";
import {
  Strategy as JWTStrategy,
  ExtractJwt as ExtractJWT,
} from "passport-jwt";

//* set up PassportJs
passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req: Request, username: string, password: string, done) => {
      User.findOne(
        { username: username },
        (err: Error | undefined, user: IUser) => {
          if (err) return done(err);

          if (!user) {
            return done(null, false, {
              message: `User ${user[username]} not found.`,
            });
          }

          bcrypt.compare(
            password,
            user.password,
            (err: Error | undefined, res: boolean) => {
              if (err) return done(err);

              if (res) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Incorrect password" });
              }
            }
          );
        }
      );
    }
  )
);

//* set up passportjs jwt
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.SECRET_KEY}`,
    },
    async (jwtPayload, cb) => {
      // find user in db
      return await User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return cb(null, user);
          }
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
