import "reflect-metadata";
import { APIGatewayProxyResult } from 'aws-lambda';

enum StatusCode {
  success = 200,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
}

class Result {
  private statusCode: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  bodyToString () {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: this.statusCode,
      body: JSON.stringify({
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data: object): APIGatewayProxyResult {
    const result = new Result(StatusCode.success, 'success', data);

    return result.bodyToString();
  }

  static error404(message: string) {
    const result = new Result(StatusCode.notFound, message);
    return result.bodyToString();
  }

  static error500(message: string) {
    const result = new Result(StatusCode.serverError, message);
    return result.bodyToString();
  }
}