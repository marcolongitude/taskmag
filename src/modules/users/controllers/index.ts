import { Request, Response } from "express";

import {
    deleteUserById,
    updateUserById,
    getUserByEmailData,
    getUserByIdData,
    getUsersData,
    createUserData,
} from "../services";

export const getUsers = async (
    request: Request,
    response: Response
): Promise<Response> => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para obter todos os usuários.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const result = await getUsersData();

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    return response.status(200).json({ data: result });
};

export const getUserById = async (
    request: Request,
    response: Response
): Promise<Response> => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para buscar usuário por id.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const { id_users } = request.params;

    const result = await getUserByIdData({ id_users });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    return response.status(200).json({ data: result });
};

export const getUserEmail = async (
    request: Request,
    response: Response
): Promise<Response> => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para buscar usuário por id.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const { email_users } = request.params;

    const result = await getUserByEmailData({ email_users });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    return response.status(200).json({ data: result.value });
};

export const updateUserId = async (
    request: Request,
    response: Response
): Promise<Response> => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para atualizar um usuário.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const { id_users } = request.params;
    const { name_users } = request.body;

    const result = await updateUserById({ id_users, name_users });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    if (result) return response.status(200).json({ data: result });
};

export const createUser = async (
    request: Request,
    response: Response
): Promise<Response> => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para criar um usuário.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const { name_users, email_users, permission, password } = request.body;

    const result = await createUserData({
        name_users,
        email_users,
        permission,
        password,
    });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    return response.status(200).json({ data: result.value });
};

export const deleteUserId = async (
    request: Request,
    response: Response
): Promise<Response> => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para deletar um usuário.'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    const { id_users } = request.params;

    console.log("req body");
    console.log(request.body);
    console.log("req body");

    const result = await deleteUserById({ id_users });

    if (result.isLeft()) {
        return response.status(result.value.statusCode).json({
            data: result.value.message,
            statusCode: result.value.statusCode,
        });
    }

    return response.status(200).json({ data: result.value });
};

