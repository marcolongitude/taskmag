import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

const model = new Model();

type Task = {
    idtasks: string;
    status: "concluido" | "pendente";
};

type Response = Either<CustomError, Task>;

export const updateStatusTasksService = async ({
    idtasks,
    status,
}: Task): Promise<Response> => {
    const schema = yup.object().shape({
        idtasks: yup.string().required(),
        status: yup.string().required(),
    });
    if (
        !(await schema.isValid({
            idtasks,
            status,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const result = await model.tasks.update({
        where: {
            idtasks,
        },
        data: {
            status,
        },
    });

    return right({
        idtasks: result.idtasks,
        title: result.title,
        description: result.description,
        time: result.time,
        date: result.date,
        users_id_users: result.users_id_users,
        status: result.status,
    });
};

