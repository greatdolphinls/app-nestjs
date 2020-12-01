import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';

import { UserProfilesRepository } from './userProfiles.repository';

import { NicknamesService } from '../../nicknames/nicknames.service';

import { UserFriendsService } from '../user-friends/user-friends.service';

import { UserWalletsService } from '../../userWallets/userWallets.service';

import { IUserProfile } from './interfaces/userProfile.interface';

@Injectable()
export class UserProfilesService {
  constructor(
    private readonly userFriendsService: UserFriendsService,
    private readonly userProfilesRepository: UserProfilesRepository,
    private readonly nicknamesService: NicknamesService,
    private readonly userWalletsService: UserWalletsService,
  ) { }

  private generateReferralCode(prefixWord: string = 'LANSLOT'): string {
    const possibleChars: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LENGTH_MIN: number = 6;
    const LENGTH_MAX: number = 8;

    const currentLength: number = Math.random() * (LENGTH_MAX - LENGTH_MIN) + LENGTH_MIN;
    let referralCode: string = '';

    for (let index = 0; index < currentLength; index++) {
      referralCode += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    return `${prefixWord.substring(0, 3).toLocaleUpperCase()}-${referralCode}`;
  }

  public async createOne({ ...userData }: IUserProfile): Promise<IUserProfile> {

    const userFound = await this.userProfilesRepository.findByEmail(userData.email);

    if (userFound) {
      throw new ConflictException('user profile exists');
    }

    userData.referralCode = this.generateReferralCode();

    return this.userProfilesRepository.createOne(userData);
  }

  public async updateById(userId: string, { ...updateData }: IUserProfile): Promise<IUserProfile> {

    const userFound = await this.userProfilesRepository.findById(userId);

    if (!userFound) {
      throw new NotFoundException();
    }

    if (!updateData.nickname || (updateData.nickname === userFound.nickname)) {
      return this.userProfilesRepository.findAndUpdateById(userId, updateData);
    }

    const foundByNickName = this.userProfilesRepository.findByNickname(updateData.nickname);
    const foundInReservedNickName = this.nicknamesService.findByNickname(updateData.nickname);

    const foundNickname = await Promise.all([foundByNickName, foundInReservedNickName]);

    if (!foundNickname[0] && !foundNickname[1]) {
      return this.userProfilesRepository.findAndUpdateById(userId, updateData);
    }

    throw new ConflictException();

  }

  public async isMySkin(skinId: string, authUserId: string): Promise<boolean> {
    const myProfile = await this.userProfilesRepository.findOne({ _id: authUserId }, 'skins');
    let mySkins = myProfile.skins;
    if (mySkins.length === 0) {
      await this.addSkin(authUserId, skinId);
    }
    const myProfileUpdated = await this.userProfilesRepository.findOne({ _id: authUserId }, 'skins');
    mySkins = myProfileUpdated.skins;
    return mySkins.map(mySkinId => mySkinId.toString()).includes(skinId);
  }

  public selectSkin(userId, skinId) {
    return this.userProfilesRepository.updateOne({ _id: userId }, { skinSelected: skinId });
  }

  public async getMySkins(userId) {
    const myProfile = await this.userProfilesRepository.findOne({ _id: userId }, 'skins', {}, 'skins');
    return myProfile.skins;
  }

  public addSkin(userId, skinId) {
    return this.userProfilesRepository.update({ _id: userId }, { $push: { skins: skinId } });
  }

  public async getProfileById(userId: string, authUserId: string) {
    const select = 'nickname stats createdAt referralCode';
    const populate = [{
      path: 'skinSelected',
      select: 'name images',
    }];

    const profile = await this.userProfilesRepository.findOne({ _id: userId }, select, {}, populate);
    if (!profile) {
      return new NotFoundException();
    }

    profile.isCoach = false;

    if (userId === authUserId) {
      const wallet = await this.userWalletsService.getBallanceForUser(authUserId);
      profile.wallet = wallet;
      profile.isMyProfile = true;
    }

    if (userId !== authUserId) {
      const isFriend = await this.userFriendsService.isMyFriend(authUserId, userId);
      profile.isFriend = isFriend;
    }
    return profile;
  }
}
