import { Request, Response } from "express";
import { getByUserData } from "../../tasks/services/getByUser";
import { getAllData } from "../services/getAll";

export const getAll = async (
    request: Request,
    response: Response
): Promise<Response> => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para buscar todas as tasks.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const result = await getAllData();

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    return response.status(200).json({ data: result });
};

