import { Injectable } from '@nestjs/common';
import { FriendRequestCreateDto } from './dto';
import { UserFriendRepository } from './user-friends.repository';
import { EUserFreindsStatus } from './enums/userFreindsStatus.enum';

@Injectable()
export class UserFriendsService {
    constructor(private readonly userFriendRepository: UserFriendRepository) {
    }

    public async createFriendRequest(newFriendRequest: FriendRequestCreateDto) {
        const inverseRequest = await this.userFriendRepository.findOne({
            _userFrom: newFriendRequest._userTo,
            _userTo: newFriendRequest._userFrom,
        });
        if (inverseRequest !== null) {
            return this.approuveFreindsRequest(newFriendRequest._userTo, newFriendRequest._userFrom);
        }
        return this.userFriendRepository.createOne(newFriendRequest);
    }

    public async getMyFreinds(userId: string) {
        const acceptedFriends = await this.userFriendRepository.findMany({
            where: {
                _userTo: userId,
                status: EUserFreindsStatus.APPROVED,
            },
            select: 'status',
            includeO: {
                path: '_userFrom',
                select: 'nickname stats',
            },
        });

        const friendsWhoAcceptedMe = await this.userFriendRepository.findMany({
            where: {
                _userFrom: userId,
                status: EUserFreindsStatus.APPROVED,
            },
            select: 'status',
            includeO: {
                path: '_userTo',
                select: 'nickname stats',
            },
        });

        return [...acceptedFriends, ...friendsWhoAcceptedMe];
    }

    public getFriendRequest(userId: string) {
        return this.userFriendRepository.findMany({
            where: {
                _userTo: userId,
                status: EUserFreindsStatus.PENDING,
            },
            select: 'status',
            includeO: {
                path: '_userFrom',
                select: 'email',
            },
        });
    }

    public approuveFreindsRequest(userTo: string, userFrom: string) {
        return this.userFriendRepository.updateOne({
            _userFrom: userFrom,
            _userTo: userTo,
            status: EUserFreindsStatus.PENDING,
        }, {
                status: EUserFreindsStatus.APPROVED,
            }, {
                returnNewDocument: true,
            });
    }

    public rejectFreindsRequest(userTo: string, userFrom: string) {
        return this.userFriendRepository.updateOne({
            _userFrom: userFrom,
            _userTo: userTo,
            status: EUserFreindsStatus.PENDING,
        }, {
                status: EUserFreindsStatus.REJECTED,
            }, {
                returnNewDocument: true,
            });
    }

    public async isMyFriend(userTo: string, userFrom: string) {
        const isFriend = await this.userFriendRepository.findOne({
            $or: [{
                _userFrom: userFrom,
                _userTo: userTo,
                status: EUserFreindsStatus.APPROVED,
            }, {
                _userFrom: userTo,
                _userTo: userFrom,
                status: EUserFreindsStatus.APPROVED,
            }],
        });
        return !!isFriend;
    }
}
