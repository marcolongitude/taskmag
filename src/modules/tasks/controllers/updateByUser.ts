import { Request, Response } from "express";
import { updateByUserData } from "../services/updateByUser";
import { OK } from "../../../util/responseApi";
import { getTaskById } from "../services/getTaskById";

export const updateByUser = async (
    request: Request,
    response: Response,
): Promise<Response> => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para atualizar uma tarefa.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    const { idtasks } = request.params;

    const existsTask = await getTaskById({ idtasks });

    if (existsTask.isLeft()) {
        return response.status(existsTask.value.statusCode).json({
            data: existsTask.value.message,
            statusCode: existsTask.value.statusCode,
        });
    }

    const { title, description, time, date } = request.body;

    const result = await updateByUserData({
        idtasks,
        title,
        description,
        time,
        date,
    });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    if (result) return response.json(OK({ data: result.value }));
};

