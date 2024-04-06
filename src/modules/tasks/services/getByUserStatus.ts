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
    id: string;
    status: "concluido" | "pendente";
};

type Response = Either<CustomError, Tasks[]>;

export const getByUserStatusData = async ({
    id,
    status,
}: Request): Promise<Response> => {
    const schema = yup.object().shape({
        id: yup.string().required("Id user is required"),
        status: yup
            .string()
            .required("Status is required")
            .oneOf(["concluido", "pendente"]),
    });

    if (
        !(await schema.isValid({
            id,
            status,
        }))
    ) {
        return left(new CustomError("Validate fails", 400));
    }

    const result = await model.tasks.findMany({
        where: {
            users_id_users: id,
            status: status,
        },
    });

    if (!result) return left(new CustomError("tasks not found", 400));

    return right(result);
};

