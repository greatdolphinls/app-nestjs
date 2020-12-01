import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message = getExceptionMessage(exception);
    const status = getExceptionStatus(exception);

    const responseObject = {
      timestamp: new Date().toISOString(),
      statusCode: status,
      path: request.url,
      message,
    };

    let exceptionInfo = null;
    if (exception instanceof Error) {
      exceptionInfo = exception.stack;
    } else {
      exceptionInfo = exception;
    }

    const logObject = { ...responseObject, message, exception: exceptionInfo, body: request.body, params: request.params };

    LoggerService.error(JSON.stringify(logObject));

    response.status(status).json(responseObject);
  }
}

const getExceptionStatus = (exception: unknown): number => {
  if (exception instanceof HttpException) {
    return exception.getStatus();
  } else {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
};

const getExceptionMessage = (exception: unknown): any => {
  if (process.env.NODE_ENV !== 'production') {
    if (exception instanceof Error) {
      return exception.stack;
    }
    return exception;
  }

  if (exception instanceof HttpException) {
    return exception.message.message;
  } else {
    return 'Ooops, something went wrong';
  }
};
