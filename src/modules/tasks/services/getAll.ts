import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";
import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
const model = new Model();

type Tasks = {
    users_id_users: string;
    title: string;
    description: string;
    time: number;
    idtasks: string;
};

type Users = {
    id_users: string;
    name_users: string;
    email_users: string;
    permission: string;
    password_hash: string;
    tasks: Tasks[];
};

type Response = Either<CustomError, Users[]>;

export const getAllData = async (): Promise<Response> => {
    const users = await model.users.findMany({
        include: {
            tasks: true,
        },
    });

    if (!users) return left(new CustomError("Users not found", 400));

    return right(users);
};

