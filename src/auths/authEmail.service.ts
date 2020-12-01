import { Injectable } from '@nestjs/common';

import { EmailService } from '../shared/services/email/email.service';

import { IAuthSignUpEmailData } from './interfaces/authSignUpEmailData.interface';
import { IAuthSignUpEmailOptions } from './interfaces/authSignUpEmailOptions.interface';

@Injectable()
export class AuthEmailService {
  constructor(
    private readonly emailService: EmailService,
  ) { }

  async sendSignUpEmail(signUpEmailOptions: IAuthSignUpEmailOptions, signUpEmailData: IAuthSignUpEmailData): Promise<boolean> {

    // TODO: modify template (provide with a real HTML template)
    const htmlData = `
      <!DOCTYPE html>
      <head>
        <title>lanslot app</title>
      </head>
      <body>

          You're almost there! Just confirm your email <br><br>
          You've successfully created a Lanslot account. To activate it,
          please use this code <b>${signUpEmailData.activationCode}</b> in the application<br><br>

        </body>
      </html>
    `;

    const emailData = {
      to: signUpEmailOptions.to,
      from: 'Lanslot App <contact@lanslot.app>',
      subject: 'Lanslot App: Welcome Email',
      text: '',
      html: htmlData,
    };

    await this.emailService.sendEmail(emailData);

    return true;
  }

  async sendForgotPasswordEmail(emailTo: string, token: string): Promise<boolean> {

    const htmlContent = `
      We have received a request to reset your password on your Lanslot account. <br> <br>

      If you requested it, use the code below. <br> <br>

      <b>${token}</b> <br> <br>

      If you’re not aware of the request to reset your password on your Lanslot account or
      if you need help with your account, contact our help service on
      <a href="https://www.lanslot.app/contact">https://www.lanslot.app/contact</a> <br> <br>

      Team Lanslot

    `;

    const emailData = {
      to: emailTo,
      from: 'Lanslot App <contact@lanslot.app>',
      subject: 'Lanslot App: Forgot Password',
      text: '',
      html: htmlContent,
    };

    await this.emailService.sendEmail(emailData);

    return true;
  }
}
