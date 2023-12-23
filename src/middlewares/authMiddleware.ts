import { CustomError } from "appError/custom-error.model";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { getUserByIdData } from "../modules/users/services";
import authConfig from "./authConfigJWT";

export default (permission: string) => {
    const arrayPermission: Array<string> = permission.split("");

    interface IPermissions {
        super: string;
        admin: string;
        comum: string;
    }

    interface IToken {
        id_user: string;
        user_permission: string;
    }

    const permissions: IPermissions = {
        super: "s",
        admin: "a",
        comum: "c",
    };

    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader: string = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Token not provided" });
        }

        const authHeaderJson: { token: string } = JSON.parse(authHeader);
        const tokenJwt: string = authHeaderJson.token;

        try {
            const decoded = jwt.verify(tokenJwt, authConfig.secret) as IToken;
            const id_users = decoded.id_user;
            const user = await getUserByIdData({ id_users });

            if (!user) {
                throw new CustomError("User not found", 404);
            }

            if (
                decoded.id_user !== user.id_users ||
                decoded.user_permission !== user.permission
            ) {
                throw new CustomError("Token invalid", 401);
            }

            if (!arrayPermission.includes(permissions[user?.permission])) {
                throw new CustomError("Unauthorized", 401);
            }

            req.body.userId = decoded.id_user;

            return next();
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    };
};
