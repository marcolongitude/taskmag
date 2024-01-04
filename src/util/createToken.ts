import jwt from "jsonwebtoken";

import AuthConfig from "../middlewares/authConfigJWT";

export const createToken = ({
    id_users,
    name_users,
    email_users,
    permission,
}) => {
    const token = jwt.sign(
        { id_users, name_users, email_users, permission },
        AuthConfig.secret,
        {
            expiresIn: AuthConfig.expiresIn,
        }
    );

    return token;
};

