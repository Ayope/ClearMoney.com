import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { FirebaseError } from 'firebase/app';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      const validationErrors = exception.getResponse();
      message = 'Validation failed';
      return response.status(status).json({
        statusCode: status,
        message: message,
        success: false,
        data: validationErrors['message'],
      });
    }

    if (exception instanceof FirebaseError) {
      switch (exception.code) {
        case 'auth/email-already-in-use':
          status = HttpStatus.BAD_REQUEST;
          message = 'Email is already in use';
          break;
        case 'auth/invalid-credential' :
          status = HttpStatus.UNAUTHORIZED;
          message = 'The credentials used for authentication are invalid';
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = 'Firebase Error: ' + exception.message;
          break;
      }
    }

    console.error(exception);

    response.status(status).json({
      statusCode: status,
      message: message,
      success: false,
      data: null,
    });
  }
}
