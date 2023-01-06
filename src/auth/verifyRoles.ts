import { Request, Response, NextFunction } from "express";

export const verifyRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.user?.roles) return res.sendStatus(401);

    // * req.user.roles EXISTS
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.user.roles);

    // * if rolesArray includes role, then TRUE else FALSE
    const result = req.user.roles
      .map((role: string) => {
        return rolesArray.includes(role);
      })
      .find((val) => val === true);

    if (!result) return res.sendStatus(401); // Unauthorized

    next();
  };
};
