import { Request, Response } from "express";
import { getByUserData } from "../../tasks/services/getByUser";
import { OK } from "../../../util/responseApi";

export const getByUser = async (
    request: Request,
    response: Response,
): Promise<Response> => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para buscar tasks por usuario logado.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const { userId } = request.body;

    const result = await getByUserData({ id_users: userId });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
        });
    }

    return response.json(OK({ data: result.value }));
};

