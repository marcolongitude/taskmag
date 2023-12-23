import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";
import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
const model = new Model();

type IResponse = {
    users_id_users: string;
    title: string;
    description: string;
    time: number;
    idtask: string;
};

type Response = Either<CustomError, IResponse[]>;

export const getAllData = async (): Promise<Response> => {
    const listTasks = await model.tasks.findMany({
        include: {
            users: true,
        },
    });

    if (!listTasks) return left(new CustomError("Users not found", 400));

    const tasks: IResponse[] = listTasks.map((task) => {
        return {
            users_id_users: task.users_id_users,
            title: task.title,
            description: task.description,
            time: task.time,
            idtask: task.idtasks,
        };
    });

    return right(tasks);
};

