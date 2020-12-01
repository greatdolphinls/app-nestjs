import * as bcrypt from 'bcrypt';
import { Injectable, BadRequestException } from '@nestjs/common';

import { UserIdentitiesRepository } from './userIdentities.repository';
import { IPasswordForgotToken } from './interfaces/passwordForgotToken.interface';

@Injectable()
export class UserIdentitiesPasswordService {
  private saltRounds = 10;
  private encoder;

  constructor(
    private readonly userIdentitiesRepository: UserIdentitiesRepository,
  ) {
    this.encoder = bcrypt;
  }

  private async setPassword(authId: string, passwordHash): Promise<boolean> {
    return this.userIdentitiesRepository.findAndUpdateById(authId, { passwordHash, 'tokens.passwordForgotToken': null });
  }

  private getPasswordForgetToken(): IPasswordForgotToken {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.setDate(currentDate.getDate() + 1)).toISOString();

    const passwordForgotToken: IPasswordForgotToken = {
      value: Math.floor(100000 + Math.random() * 900000).toString(),
      expirationDate,
    };

    return passwordForgotToken;
  }

  public getHash(password: string | undefined): Promise<string> {
    return this.encoder.hash(password, this.saltRounds);
  }

  public compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return this.encoder.compare(password, hash);
  }

  public async createPasswordForgotToken(username: string): Promise<IPasswordForgotToken> {

    const authFound = await this.userIdentitiesRepository.findByUsername(username);

    if (!authFound) {
      return null;
    }

    const passwordForgotToken = this.getPasswordForgetToken();

    await this.userIdentitiesRepository.setPasswordForgotToken(username, passwordForgotToken);

    return passwordForgotToken;

  }

  public async resetPassword(username: string, password: string, token: string): Promise<boolean> {

    const userIdentityFound = await this.userIdentitiesRepository.findOne({ username, 'tokens.passwordForgotToken.value': token });

    if (!userIdentityFound) {
      throw new BadRequestException('provided data invalid or expired');
    }

    const forgotPasswordToken: IPasswordForgotToken = userIdentityFound.tokens.passwordForgotToken;
    const currentDate = new Date();
    const takenExpirationDate = new Date(forgotPasswordToken.expirationDate);

    if (takenExpirationDate <= currentDate) {
      throw new BadRequestException('provided data invalid or expired');
    }

    const newPasswordHash = await this.getHash(password);
    await this.setPassword(userIdentityFound._id, newPasswordHash);

    return true;
  }

}
