export class CustomError extends Error {
    message: string;
    statusCode: number;
    additionalInfo!: object;

    constructor(
        message: string,
        statusCode = 500,
        additionalInfo: object = {}
    ) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.additionalInfo = additionalInfo;
    }

    // get message(): string {
    //     return this._message;
    // }

    // get statusCode(): number {
    //     return this._status;
    // }

    // get additionalInfo(): object {
    //     return this._additionalInfo;
    // }
}

