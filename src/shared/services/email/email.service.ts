import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { IEmailOptions } from './emailOptions.interface';

@Injectable()
export class EmailService {

  constructor(private readonly mailerService: MailerService) { }

  public sendEmail(emailOptions: IEmailOptions): Promise<any> {
    return this.mailerService.sendMail(emailOptions);
  }
}
