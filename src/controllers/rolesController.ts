import { HydratedDocument } from "mongoose";
import { Role, IRole } from "../models/roles";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const create_role_post = [
  body("role_name", "Role must have a name").trim().escape(),
  body("role_id", "Role must have a number ID").trim().escape(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
    }

    Role.findOne(
      { role_name: req.body.role_name },
      (err: Error, foundRole: IRole) => {
        if (err) {
          console.error(err);
        }

        if (foundRole) {
          return res.status(409).json({
            message: `User with role name of "${req.body.role_name}" already exists.`,
          });
        }

        // role name doesn't exist
        // see if role id already exists
        Role.findOne(
          { role_id: req.body.role_id },
          (err: Error, foundRole: IRole) => {
            if (err) {
              console.error(err);
            }

            if (foundRole) {
              return res.status(409).json({
                message: `User with Role ID of "${req.body.role_id}" already exists.`,
              });
            }

            // role id does not exist either
            // create new role
            const newRole: HydratedDocument<IRole> = new Role({
              role_name: req.body.role_name,
              role_id: req.body.role_id,
            });

            newRole.save((err) => {
              if (err) {
                throw new Error("Issue saving new role");
              }

              return res.status(200).json({
                message: `New role with name "${req.body.role_name}" and ID of "${req.body.role_id}" created.`,
              });
            });
          }
        );
      }
    );
  },
];
