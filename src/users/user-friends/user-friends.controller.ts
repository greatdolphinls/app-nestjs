import { Controller, UseGuards, UsePipes, Req, Post, Body, Get, Put, Param } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserFriendsService } from './user-friends.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../shared/role.guard';
import { ValidationPipe } from '../../shared/validation/validation.pipe';
import { FriendRequestDto, FriendRequestPostDto, FriendMyDto } from './dto';

@ApiUseTags('Friends')
@Controller('friends')
export class UserFriendsController {
    constructor(private readonly userFriendsService: UserFriendsService) { }

    @Post('/')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    public addFriendRequest(@Req() { user }, @Body() newFriendRequestPost: FriendRequestPostDto): Promise<FriendRequestDto> {
        newFriendRequestPost._userFrom = user._id;
        const newFriendRequest = newFriendRequestPost;
        return this.userFriendsService.createFriendRequest(newFriendRequest);
    }

    @Get('/')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    public getMyFreinds(@Req() { user }): Promise<FriendMyDto[]> {
        const myId = user._id.toString();
        return this.userFriendsService.getMyFreinds(myId);
    }

    @Get('/requests')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    public getFreindsRequest(@Req() { user }): Promise<any> {
        const myId = user._id.toString();
        return this.userFriendsService.getFriendRequest(myId);
    }

    @Put('/:userFrom/approuve')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    public approuveFreindsRequest(@Req() { user }, @Param() { userFrom }): Promise<any> {
        const userTo = user._id.toString();
        return this.userFriendsService.approuveFreindsRequest(userTo, userFrom);
    }

    @Put('/:userFrom/reject')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    public rejectFreindsRequest(@Req() { user }, @Param() { userFrom }): Promise<any> {
        const userTo = user._id.toString();
        return this.userFriendsService.rejectFreindsRequest(userTo, userFrom);
    }
}
