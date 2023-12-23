import { PrismaClient as Model } from "@prisma/client";

import { CustomError } from "../../../appError/custom-error.model";
import { IUser } from "../../../interfaces";
import checkPassword from "../../../util/checkPassword";
import { createToken } from "../../../util/createToken";
import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";

const model = new Model();

type Response = Either<CustomError, string>;

export const setSessionApp = async ({ email, password }): Promise<Response> => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    });
    const user: IUser = await model.users.findUnique({
        where: {
            email_users: email,
        },
    });

    if (!(await schema.isValid({ email, password }))) {
        return left(new CustomError("Validate fails", 400));
    }

    if (!user) {
        return left(new CustomError("User not found", 400));
    }

    const { name_users, email_users, permission, password_hash } = user;

    const passwordMatched = await checkPassword(password, password_hash);

    if (!passwordMatched) {
        return left(new CustomError("Password does not match", 400));
    }

    const token = createToken({ name_users, email_users, permission });
    return right(token);
};

