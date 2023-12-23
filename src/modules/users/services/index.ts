import { v4 as uuidv4 } from "uuid";
import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
import { IUser } from "../../../interfaces";
import * as yup from "yup";
import bcrypt from "bcryptjs";
import { Either, left, right } from "../../../appError/either";

const model = new Model();

type IResponse = IUser | IUser[];

type Response = Either<CustomError, IResponse>;

export const getUsersData = async (): Promise<Response> => {
    const listUsers = await model.users.findMany();

    if (!listUsers) return left(new CustomError("Users not found", 400));

    const users = listUsers.map((user) => {
        return {
            id_users: user.id_users,
            name_users: user.name_users,
            email_users: user.email_users,
            permission: user.permission,
        };
    });

    return right(users);
};

export const getUserByIdData = async ({
    id_users,
}: Pick<IUser, "id_users">): Promise<Response> => {
    const schema = yup.object().shape({
        id_users: yup.string().required("Id user is required"),
    });

    if (
        !(await schema.isValid({
            id_users,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const user = await model.users.findFirst({
        where: {
            id_users,
        },
    });

    if (!user) return left(new CustomError("User not found", 400));

    return right({
        id_users: user.id_users,
        name_users: user.name_users,
        email_users: user.email_users,
        permission: user.permission,
    });
};

export const getUserByEmailData = async ({
    email_users,
}: Pick<IUser, "email_users">): Promise<Response> => {
    const schema = yup.object().shape({
        email_users: yup
            .string()
            .email("Email invalid")
            .required("Email is required"),
    });

    if (
        !(await schema.isValid({
            email_users,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const user = await model.users.findFirst({
        where: {
            email_users,
        },
    });

    if (!user) return left(new CustomError("User not found", 400));

    return right({
        id_users: user.id_users,
        name_users: user.name_users,
        email_users: user.email_users,
        permission: user.permission,
    });
};

export const updateUserById = async ({
    id_users,
    name_users,
}: Pick<IUser, "id_users" | "name_users">): Promise<Response> => {
    const schema = yup.object().shape({
        id_users: yup.string().required(),
        name_users: yup.string().required(),
    });

    if (
        !(await schema.isValid({
            id_users,
            name_users,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const isUserExists = await getUserByIdData({ id_users });

    if (!isUserExists) return left(new CustomError("User not found", 400));

    const user = await model.users.update({
        where: {
            id_users,
        },
        data: {
            name_users,
        },
    });

    return right({
        id_users: user.id_users,
        name_users: user.name_users,
        email_users: user.email_users,
        permission: user.permission,
    });
};

export const createUserData = async ({
    name_users,
    email_users,
    permission,
    password,
}: Omit<IUser, "id_users">): Promise<Response> => {
    const schema = yup.object().shape({
        name_users: yup.string().required(),
        email_users: yup.string().email().required(),
        permission: yup.string().required(),
        password: yup.string().min(6).required(),
    });
    if (
        !(await schema.isValid({
            name_users,
            email_users,
            permission,
            password,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const password_hash = await bcrypt.hash(password, 8);

    const user = await getUserByEmailData({ email_users });

    if (user) return left(new CustomError("User already exists", 400));

    const result = await model.users.create({
        data: {
            id_users: uuidv4(),
            name_users,
            email_users,
            permission,
            password_hash,
        },
    });

    return right({
        id_users: result.id_users,
        name_users: result.name_users,
        email_users: result.email_users,
        permission: result.permission,
    });
};

export const deleteUserById = async ({
    id_users,
}: Pick<IUser, "id_users">): Promise<Response> => {
    const schema = yup.object().shape({
        id_users: yup.string().required(),
    });

    if (
        !(await schema.isValid({
            id_users,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const user = await getUserByIdData({ id_users });

    if (!user) return left(new CustomError("User not found", 401));

    const result = await model.users.delete({
        where: {
            id_users,
        },
    });

    return right({
        id_users: result.id_users,
        name_users: result.name_users,
        email_users: result.email_users,
        permission: result.permission,
    });
};

