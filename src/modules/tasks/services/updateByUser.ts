import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

const model = new Model();

type Task = {
    title: string;
    description: string;
    time: number;
    idtasks: string;
    date: string;
};

type Response = Either<CustomError, Task>;

export const updateByUserData = async ({
    idtasks,
    title,
    description,
    time,
    date,
}: Task): Promise<Response> => {
    const schema = yup.object().shape({
        idtasks: yup.string().required(),
        title: yup.string().required(),
        description: yup.string().required(),
        time: yup.number().required(),
        date: yup.string().required(),
    });
    if (
        !(await schema.isValid({
            idtasks,
            title,
            description,
            time,
            date,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const result = await model.tasks.update({
        where: {
            idtasks,
        },
        data: {
            idtasks: uuidv4(),
            title,
            description,
            time,
            date,
        },
    });

    return right({
        idtasks: result.idtasks,
        title: result.title,
        description: result.description,
        time: result.time,
        date: result.date,
        users_id_users: result.users_id_users,
    });
};

