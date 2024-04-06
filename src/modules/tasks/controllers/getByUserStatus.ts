import { Request, Response } from "express";
import { OK } from "../../../util/responseApi";
import { getByUserStatusData } from "../services/getByUserStatus";

type StatusType = {
    status: "concluido" | "pendente";
    id: string;
};

export const getByUserStatus = async (
    request: Request<StatusType>,
    response: Response,
): Promise<Response> => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para buscar tasks por usuario logado.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const { id, status } = request.params;

    const result = await getByUserStatusData({ id: id, status });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
        });
    }

    return response.json(OK({ data: result.value }));
};

