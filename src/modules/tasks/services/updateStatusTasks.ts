import { PrismaClient as Model } from "@prisma/client";
import { CustomError } from "../../../appError/custom-error.model";
import { Either, left, right } from "../../../appError/either";
import * as yup from "yup";

const model = new Model();

type Task = {
    listStatusTasks: { [chave: string]: boolean }[];
};

type Response = Either<CustomError, { status: number }>;

export const updateStatusTasksService = async ({
    listStatusTasks,
}: Task): Promise<Response> => {
    // const schema = yup.object().shape({
    //     listStatusTasks: yup.array().required(),
    // });
    // if (
    //     !(await schema.isValid({
    //         listStatusTasks,
    //     }))
    // ) {
    //     return left(new CustomError("Validate fails", 400));
    // }

    for (const objeto of listStatusTasks) {
        const [chave, valor] = Object.entries(objeto)[0];
        await model.tasks.update({
            where: {
                idtasks: chave,
            },
            data: {
                status: valor ? "concluido" : "pendente",
            },
        });
    }

    return right({
        status: 200,
    });
};

