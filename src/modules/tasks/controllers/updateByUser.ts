import { Request, Response } from "express";
import { updateByUserData } from "../services/updateByUser";

export const updateByUser = async (
    request: Request,
    response: Response
): Promise<Response> => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para atualizar uma tarefa.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    const { idtasks } = request.params;
    const { title, description, time } = request.body;

    const result = await updateByUserData({
        idtasks,
        title,
        description,
        time,
    });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    if (result) return response.status(200).json({ data: result });
};

