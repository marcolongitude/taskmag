import { Request, Response } from "express";
import { updateByUserData } from "../services/updateByUser";
import { OK } from "../../../util/responseApi";
import { getTaskById } from "../services/getTaskById";
import { updateStatusTasksService } from "../services/updateStatusTasks";

export const updateStatusTasks = async (
    request: Request,
    response: Response,
): Promise<Response> => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para atualizar o status da tarefa.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    const { listStatusTasks } = request.body;

    const result = await updateStatusTasksService({
        listStatusTasks,
    });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    if (result) return response.json(OK({ data: result.value }));
};

