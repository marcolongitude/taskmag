import { Request, Response } from "express";
import { setSessionApp } from "../services";
import { OK } from "../../../util/responseApi";

export const SessionController = async (
    request: Request,
    response: Response,
): Promise<Response> => {
    // #swagger.tags = ['Login']
    // #swagger.description = 'Endpoint para criar uma sessão.'
    const { email, password } = request.body;
    const result = await setSessionApp({ email, password });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    return response.json(OK({ data: result.value }));
};

