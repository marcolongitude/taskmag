import { PrismaClient as Model } from "@prisma/client";

import { CustomError } from "../../../appError/custom-error.model";
import { IUser } from "../../../interfaces";
import checkPassword from "../../../util/checkPassword";
import { createToken } from "../../../util/createToken";
import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";

const model = new Model();

type Request = {
    token: string;
    user: {
        id_users: string;
        name_users: string;
        email_users: string;
    };
};

type Response = Either<CustomError, Request>;

export const setSessionApp = async ({ email, password }): Promise<Response> => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    });

    if (!(await schema.isValid({ email, password }))) {
        return left(new CustomError("Validate fails", 400));
    }

    const user: IUser = await model.users.findUnique({
        where: {
            email_users: email,
        },
    });

    if (!user) {
        return left(new CustomError("User not found", 400));
    }

    const { id_users, name_users, email_users, permission, password_hash } =
        user;

    const passwordMatched = await checkPassword(password, password_hash);

    if (!passwordMatched) {
        return left(new CustomError("Password does not match", 400));
    }

    const token = createToken({
        id_users,
        name_users,
        email_users,
        permission,
    });

    const response = {
        token,
        user: {
            id_users,
            name_users,
            email_users,
        },
    };

    return right(response);
};

