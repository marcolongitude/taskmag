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
};

type Request = {
    id_users: string;
};

type Response = Either<CustomError, Tasks[]>;

export const getByUserData = async ({
    id_users,
}: Request): Promise<Response> => {
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

    const result = await model.tasks.findMany({
        where: {
            users_id_users: id_users,
        },
    });

    if (!result) return left(new CustomError("tasks not found", 400));

    return right(result);
};

