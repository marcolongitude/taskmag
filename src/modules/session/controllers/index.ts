import { Request, Response } from "express";
import { setSessionApp } from "../services";

export const SessionController = async (
    request: Request,
    response: Response
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

    return response.status(200).json({ data: result.value });
};

