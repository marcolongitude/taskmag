import { Request, Response } from "express";
import { deleteByUserData } from "../services/deleteByUser";
import { OK } from "../../../util/responseApi";

interface RequestParams {
    idtasks: string;
}

export const deleteByUser = async (
    request: Request,
    response: Response,
): Promise<Response> => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para deletar uma tarefa.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    const { idtasks } = request.params;

    const result = await deleteByUserData({
        idtasks,
    });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    if (result) return response.json(OK({ data: result.value }));
};

