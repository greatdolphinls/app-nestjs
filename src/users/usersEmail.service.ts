import { Injectable } from '@nestjs/common';

import { EmailService } from '../shared/services/email/email.service';
import { IUserProfile } from './userProfiles/interfaces/userProfile.interface';
import { IUserIdentity } from './userIdentities/interfaces/userIdentity.interface';

// import { IAuthSignUpEmailData } from './interfaces/authSignUpEmailData.interface';
// import { IAuthSignUpEmailOptions } from './interfaces/authSignUpEmailOptions.interface';

@Injectable()
export class UsersEmailService {
  constructor(
    private readonly emailService: EmailService,
  ) { }

  async sendNewUserEmail(userProfile: IUserProfile, userIdentity: IUserIdentity): Promise<boolean> {
    // TODO: modify template (provide with a real HTML template)
    const htmlData = `
      <!DOCTYPE html>
      <head>
        <title>lanslot app</title>
      </head>
      <body>

          Hello! We have added your account to our application.
          Just confirm your email <br><br>
          You've successfully created a Lanslot account. To activate it,
          please use this code <b>${userIdentity.activationCode}</b> in the application<br><br>

          But first please reset your password.

        </body>
      </html>
    `;

    const emailData = {
      to: userProfile.email,
      from: 'Lanslot App <contact@lanslot.app>',
      subject: 'Lanslot App: Welcome Email',
      text: '',
      html: htmlData,
    };

    await this.emailService.sendEmail(emailData);

    return true;
  }
}
