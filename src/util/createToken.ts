import jwt from "jsonwebtoken";

import AuthConfig from "../middlewares/authConfigJWT";

export const createToken = ({ name_users, email_users, permission }) => {
    const token = jwt.sign(
        { name_users, email_users, permission },
        AuthConfig.secret,
        {
            expiresIn: AuthConfig.expiresIn,
        }
    );

    return token;
};
