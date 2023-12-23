import { CustomError } from "../appError/custom-error.model";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { getUserByEmailData, getUserByIdData } from "../modules/users/services";
import authConfig from "./authConfigJWT";

interface IPermissions {
    readonly super: string;
    readonly admin: string;
    readonly comum: string;
}

interface IToken {
    readonly email_users: string;
    readonly permission: string;
}

const permissions: IPermissions = {
    super: "s",
    admin: "a",
    comum: "c",
};

export default (permission: string) => {
    const requiredPermissions = permission.split("");

    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Token not provided" });
        }

        try {
            const authHeaderJson = authHeader;
            const tokenJwt = authHeaderJson;

            const decoded = jwt.verify(tokenJwt, authConfig.secret) as IToken;
            const { email_users, permission } = decoded;

            const user = await getUserByEmailData({ email_users });

            if (user.isLeft()) {
                throw new CustomError("User not found", 404);
            }

            const userData = {
                id_users: user.value.id_users,
                name_users: user.value.name_users,
                email_users: user.value.email_users,
                permission: user.value.permission,
            };

            if (
                email_users !== userData.email_users ||
                permission !== userData.permission
            ) {
                throw new CustomError("Token invalid", 401);
            }

            if (
                !requiredPermissions.includes(permissions[userData.permission])
            ) {
                throw new CustomError("Unauthorized", 401);
            }

            req.body.userId = userData.id_users;

            return next();
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    };
};

