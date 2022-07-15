export class ErrorResponse {
    statusCode: number;
    message: string;
    data: string | any;

    private constructor(statusCode: number, message: string, data: string | any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    static create(statusCode: number, message: string, data: string | any): ErrorResponse {
        return new ErrorResponse(statusCode, message, data);
    }
}