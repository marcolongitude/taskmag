import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";

const model = new Model();

type Tasks = {
    users_id_users: string;
    title: string;
    description: string;
    time: number;
    date: string;
};

type Request = {
    idtasks: string;
};

type Response = Either<CustomError, Tasks>;

export const getTaskById = async ({
    idtasks,
}: Pick<Request, "idtasks">): Promise<Response> => {
    const schema = yup.object().shape({
        idtasks: yup.string().required("Id task is required"),
    });

    if (
        !(await schema.isValid({
            idtasks,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const result = await model.tasks.findFirst({
        where: {
            idtasks: idtasks,
        },
    });

    if (!result) return left(new CustomError("tasks not found", 400));

    return right(result);
};

