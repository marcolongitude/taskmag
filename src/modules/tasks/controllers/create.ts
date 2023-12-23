import { createData } from "../services/create";
import { Request, Response } from "express";

export const create = async (
    request: Request,
    response: Response
): Promise<Response> => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para criar uma tarefa.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const { title, description, time, userId } = request.body;

    console.log("tasks controller 1");

    const result = await createData({
        title,
        description,
        time,
        userId,
    });
    console.log("tasks controller 2");

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    return response.status(200).json({ data: result.value });
};

