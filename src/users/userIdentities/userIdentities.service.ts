
import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';

import { UserIdentitiesRepository } from './userIdentities.repository';
import { UserIdentitiesPasswordService } from './userIdentityPassword.service';
import { IUserIdentity } from './interfaces/userIdentity.interface';

@Injectable()
export class UserIdentitiesService {
  constructor(
    private readonly userIdentitiesRepository: UserIdentitiesRepository,
    private readonly userIdentitiesPasswordService: UserIdentitiesPasswordService,
  ) { }

  private createActivationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  public setIdentificationData(id, refreshToken) {
    return this.userIdentitiesRepository.findAndUpdateById(id, { 'tokens.refreshToken': refreshToken });
  }

  public async createOne(userIdentityData) {

    const userIdentityFound = await this.userIdentitiesRepository.findByUsername(userIdentityData.email);

    if (userIdentityFound) {
      throw new ConflictException('user identity exists');
    }

    const passwordHash = await this.userIdentitiesPasswordService.getHash(userIdentityData.password);
    const activationCode = this.createActivationCode();

    const newUserIdentityData: IUserIdentity = {
      passwordHash,
      username: userIdentityData.username,
      _user: userIdentityData._user,
      activationCode,
    };

    const userIdentityCreated = await this.userIdentitiesRepository.createOne(newUserIdentityData);

    return userIdentityCreated;
  }

  public async identify(signInUsername: string, signInPassword: string): Promise<{ username: string, _id: string, isActive: boolean }> {
    const authFound = await this.userIdentitiesRepository.findByUsername(signInUsername);

    if (!authFound) {
      throw new BadRequestException();
    }
    const { passwordHash, username, _id, isActive } = authFound;

    const isPasswordValid = await this.userIdentitiesPasswordService.compareHash(signInPassword, passwordHash);

    if (!isPasswordValid) {
      throw new BadRequestException();
    }

    return { username, _id, isActive };
  }

  public async activate(userIdentityId: string, activateSignUpData): Promise<boolean> {

    const userIdentityFound: IUserIdentity = await this.userIdentitiesRepository.findOne({ _user: userIdentityId });

    if (!userIdentityFound) {
      throw new BadRequestException();
    }

    if (userIdentityFound.isActive) {
      throw new BadRequestException();
    }

    if (!(userIdentityFound.activationCode === activateSignUpData.activationCode)) {
      throw new BadRequestException();
    }

    await this.userIdentitiesRepository.findAndUpdateById(userIdentityFound._id.toString(), { isActive: true, activationCode: null });

    return true;

  }

  public async isRefreshTokenInfoValid(refreshToken: string, identityId: string) {
    const foundIdentity = await this.userIdentitiesRepository.findOne({ 'tokens.refreshToken': refreshToken, '_id': identityId });
    return !!(foundIdentity);
  }
}
