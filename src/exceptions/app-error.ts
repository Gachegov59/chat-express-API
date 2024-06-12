import { errors } from '../config/constants';

export class ApiError extends Error {
	status: number;
	errors: Array<{}>;

    constructor(status: number, message: string, errors: Array<{}> = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(): ApiError {
        return new ApiError(401, errors.USER_IS_NOT_AUTHORIZED);
    }

    static BadRequest(message: string, error: Array<{}> = []) {
        return new ApiError(400, message, error);
    }
}
