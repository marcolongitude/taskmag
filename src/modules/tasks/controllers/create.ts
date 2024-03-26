import { CREATE } from "../../../util/responseApi";
import { createData } from "../services/create";
import { Request, Response } from "express";

export const create = async (
    request: Request,
    response: Response,
): Promise<Response> => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para criar uma tarefa.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const { title, description, time, userId, date } = request.body;

    const result = await createData({
        title,
        description,
        time,
        userId,
        date,
    });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    return response.status(201).json(CREATE({ data: result.value }));
};

