interface IResponse<T> {
    data: T;
}

export const OK = <T>({ data }: IResponse<T>) => {
    return {
        data,
        statusCode: 200,
    };
};

export const CREATE = <T>({ data }: IResponse<T>) => {
    return {
        data,
        statusCode: 201,
    };
};

