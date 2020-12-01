import { JwtService } from '@nestjs/jwt';
import { Injectable, BadRequestException } from '@nestjs/common';

import { AuthEmailService } from './authEmail.service';
import { UsersService } from '../users/users.service';
import { UserIdentitiesService } from '../users/userIdentities/userIdentities.service';

import { UserIdentitiesPasswordService } from '../users/userIdentities/userIdentityPassword.service';
import { IAuthSignInOutput } from './interfaces/authSignInOutput.interface';

import { AuthActivateDto, AuthSignUpDto, AuthRefreshTokenDto } from './dto';

@Injectable()
export class AuthsService {

  constructor(
    private readonly authEmailService: AuthEmailService,
    private readonly usersService: UsersService,
    private readonly userIdentitiesService: UserIdentitiesService,
    private readonly userIdentitiesPasswordService: UserIdentitiesPasswordService,
    private readonly jwtService: JwtService,
  ) { }

  private async setSignInData(id: string, refreshToken: string): Promise<void> {
    return this.userIdentitiesService.setIdentificationData(id, refreshToken);
  }

  private async signAuthTokens(identificationInfo: { _id: string, username: string, isActive: boolean }) {

    const accessTokenExpiresIn = 3600;
    const refreshTokenExpiresIn = 7200;

    const accessToken = await this.jwtService.sign(identificationInfo, { expiresIn: accessTokenExpiresIn });
    const refreshToken = await this.jwtService.sign(identificationInfo, { expiresIn: refreshTokenExpiresIn });

    await this.setSignInData(identificationInfo._id, refreshToken);

    return {
      accessToken,
      refreshToken,
      isActive: identificationInfo.isActive,
      expiresIn: accessTokenExpiresIn,
    };
  }

  public async signUp(signUpData: AuthSignUpDto): Promise<boolean> {

    const userCreated = await this.usersService.createOne(signUpData);

    await this.authEmailService.sendSignUpEmail(
      { to: signUpData.email },
      { activationCode: userCreated.identity.activationCode },
    );

    return true;

  }

  public async signIn(username: string, password: string): Promise<IAuthSignInOutput> {

    const identificationInfo = await this.userIdentitiesService.identify(username, password);

    return this.signAuthTokens(identificationInfo);
  }

  public activateSignUp(authId: string, activateSignUpData: AuthActivateDto): Promise<boolean> {
    return this.userIdentitiesService.activate(authId, activateSignUpData);
  }

  public async sendForgotPasswordToken(username: string): Promise<boolean> {
    const passwordForgotToken = await this.userIdentitiesPasswordService.createPasswordForgotToken(username);

    if (passwordForgotToken) {
      await this.authEmailService.sendForgotPasswordEmail(username, passwordForgotToken.value);
    }

    return true;
  }

  public resetPassword(email: string, password: string, token: string): Promise<boolean> {
    return this.userIdentitiesPasswordService.resetPassword(email, password, token);
  }

  public async refreshToken(refreshTokenData: AuthRefreshTokenDto): Promise<IAuthSignInOutput> {

    let verifyTokenData = null;

    try {
      verifyTokenData = await this.jwtService.verifyAsync(refreshTokenData.refreshToken);
    } catch (err) {
      throw new BadRequestException('invalid or expired refresh token');
    }

    const isValid = await this.userIdentitiesService.isRefreshTokenInfoValid(refreshTokenData.refreshToken, verifyTokenData._id);

    if (isValid) {
      return this.signAuthTokens({ _id: verifyTokenData._id, username: verifyTokenData.username, isActive: verifyTokenData.isActive });
    }

    throw new BadRequestException('invalid or expired refresh token');
  }
}
