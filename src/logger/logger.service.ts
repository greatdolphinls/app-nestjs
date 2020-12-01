import { Logger } from '@nestjs/common';

export class LoggerService extends Logger {
  error(message: string, trace: string) {
    super.error(message, trace);
  }
}
