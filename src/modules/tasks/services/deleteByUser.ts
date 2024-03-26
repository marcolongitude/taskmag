import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

const model = new Model();

type Task = {
    idtasks: string;
};

type Response = Either<CustomError, Task>;

export const deleteByUserData = async ({
    idtasks,
}: Task): Promise<Response> => {
    const schema = yup.object().shape({
        idtasks: yup.string().required(),
    });
    if (
        !(await schema.isValid({
            idtasks,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const result = await model.tasks.delete({
        where: {
            idtasks,
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

