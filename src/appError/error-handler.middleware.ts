import { Request, Response, NextFunction } from "express";

import { Prisma } from "@prisma/client";

import { CustomError } from "./custom-error.model";

function handleError(
    err: TypeError | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let customError = err;

    if (!(err instanceof CustomError)) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (
                err.code === "P2025" ||
                err.code === "P1001" ||
                err.code === "P2000" ||
                err.code === "P2002" ||
                err.code === "P2003"
            ) {
                customError = new CustomError(
                    "Oh no, this is embarrasing. We are having troubles my friend = prisma client",
                    500,
                    {
                        meta: err.meta,
                        codePrisma: err.code,
                        stackTrace: err.stack,
                    }
                );
            } else {
                customError = new CustomError(
                    "Oh no, this is embarrasing. We are having troubles my friend = prisma client",
                    500,
                    { stackTrace: err.stack }
                );
            }
        }
    }

    res.status((customError as CustomError).statusCode).send(customError);
}

export default handleError;

