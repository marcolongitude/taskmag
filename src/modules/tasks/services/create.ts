import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

const model = new Model();

const schema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    time: yup.number().required(),
    userId: yup.string().min(6).required(),
});

type Task = yup.InferType<typeof schema>;

type Response = Either<CustomError, Task>;

export const createData = async ({
    title,
    description,
    time,
    userId,
}: Task): Promise<Response> => {
    if (
        !(await schema.isValid({
            title,
            description,
            time,
            userId,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const result = await model.tasks.create({
        data: {
            idtasks: uuidv4(),
            title,
            description,
            time,
            users_id_users: userId,
        },
    });

    return right({
        title: result.title,
        description: result.description,
        time: result.time,
        userId: result.users_id_users,
    });
};

