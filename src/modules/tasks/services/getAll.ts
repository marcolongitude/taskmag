import { Either, left, right } from "../../../appError/either";
import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
const model = new Model();

type Tasks = {
    title: string;
    description: string;
    time: number;
    idtasks: string;
    date: string;
};

type Users = {
    password_hash: string;
    id_users: string;
    name_users: string;
    email_users: string;
    permission: string;
    tasks: Tasks[];
};

type Response = Either<CustomError, Users[]>;

export const getAllData = async (): Promise<Response> => {
    const users: Users[] = await model.users.findMany({
        include: {
            tasks: {
                select: {
                    idtasks: true,
                    title: true,
                    description: true,
                    time: true,
                    date: true,
                },
            },
        },
    });
    if (!users) return left(new CustomError("Users not found", 400));

    for (const user of users) {
        delete user.password_hash;
    }

    return right(users);
};

