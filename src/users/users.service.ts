import { Injectable, NotFoundException } from '@nestjs/common';

import { UserProfilesService } from '../users/userProfiles/userProfiles.service';
import { UserIdentitiesService } from '../users/userIdentities/userIdentities.service';

import { IUserProfile } from './userProfiles/interfaces/userProfile.interface';
import { IUserIdentity } from './userIdentities/interfaces/userIdentity.interface';
import { IUser } from './interfaces/user.interface';
import { IUserIdentityCreate } from './userIdentities/interfaces/userIdentityCreate.interface';
import { IUserCreate } from './interfaces/userCreate.interface';

import { UserIdentitiesRepository } from './userIdentities/userIdentities.repository';
import { UserProfilesRepository } from './userProfiles/userProfiles.repository';
import { FindManyUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userProfilesService: UserProfilesService,
    private readonly userIdentitiesService: UserIdentitiesService,
    private readonly userIdentitiesRepository: UserIdentitiesRepository,
    private readonly userProfilesRepository: UserProfilesRepository,
  ) { }

  private getRandomPassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  public async createOne(userData: IUserCreate): Promise<IUser> {

    const newUserProfileData: IUserProfile = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.dateOfBirth,
    };

    const profile: IUserProfile = await this.userProfilesService.createOne(newUserProfileData);

    const newAuthData: IUserIdentityCreate = {
      password: userData.password || this.getRandomPassword(), // generate random password if not provided
      username: userData.email,
      _user: profile._id,
    };

    const identity: IUserIdentity = await this.userIdentitiesService.createOne(newAuthData);

    return { profile, identity };
  }

  public async deleteById(userId: string): Promise<boolean> {

    const userFound = await this.userProfilesRepository.findById(userId);

    if (userFound) {
      const deleteUserProfile = this.userProfilesRepository.deleteById(userId);
      const deleteUserIdentity = this.userIdentitiesRepository.delete({ _user: userId });

      await Promise.all([deleteUserIdentity, deleteUserProfile]);

      return true;
    }

    throw new NotFoundException('user not found');
  }

  public async getById(userId: string): Promise<IUserProfile> {
    const userFound = await this.userProfilesRepository.findById(userId);
    if (userFound) {
      return userFound;
    }
    throw new NotFoundException('user not found');
  }

  public getMany(query): Promise<IUserProfile[]> {
    return this.userProfilesRepository.findMany(query);
  }

 /**
  * Quick search for users. By email fields only. (searches by pattern - RegExp)
  * @param param0
  */
  public findByPattern({ ...query }: FindManyUserDto) {
    return this.userProfilesRepository.findByPattern('email', query);
  }

  public async getManyForUser(query: FindManyUserDto, excludeUserId: string) {
    const mappedQuery: FindManyUserDto = { ...query };
    mappedQuery.where._id = { $ne: excludeUserId };
    return this.userProfilesRepository.findMany(mappedQuery);
  }

  public findByIdentityUsername(username: string): Promise<IUserIdentity> {
    return this.userIdentitiesRepository.findOne({ username }, '', {}, '_user');
  }

  public countAll(): Promise<number> {
    return this.userProfilesRepository.countAll();
  }

  public countExceptIds(idList: string[]): Promise<number> {
    return this.userProfilesRepository.countAll({ _id: { $nin: idList } });
  }
}
