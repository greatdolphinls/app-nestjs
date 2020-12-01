import { Controller, Get, UseGuards, Param, UsePipes, ValidationPipe, Req, Put, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserProfilesService } from './userProfiles.service';

@ApiUseTags('Profiles')
@Controller('profiles')
export class UserProfilesController {
    constructor(private readonly userProfilesService: UserProfilesService) { }

    @Get('/')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 201, description: 'The user has been successfully found.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    public getMyProfile(@Req() { user }): Promise<any> {
        const userId = user._id.toString();
        return this.userProfilesService.getProfileById(userId, userId);
    }

    @Get('/skins')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 201, description: 'The user has been successfully found.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    public getMySkins(@Req() { user }): Promise<any> {
        const userId = user._id.toString();
        return this.userProfilesService.getMySkins(userId);
    }

    @Get('/:userId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    @ApiImplicitParam({ name: 'userId', type: String })
    @ApiResponse({ status: 201, description: 'The user has been successfully found.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    public getProfileByUserId(@Param() { userId }, @Req() { user }): Promise<any> {
        const authUserId = user._id.toString();
        return this.userProfilesService.getProfileById(userId, authUserId);
    }

    @Put('/:skinId/select')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    @ApiImplicitParam({ name: 'skinId', type: String })
    @ApiResponse({ status: 201, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    public async selectSkinById(@Param() { skinId }, @Req() { user }) {
        const userId = user._id.toString();
        const isMySkin = await this.userProfilesService.isMySkin(skinId, userId);
        if (!isMySkin) {
            throw new NotFoundException('The skin is not owned by the user', 'Skin not found');
        }
        return this.userProfilesService.selectSkin(userId, skinId);
    }
}
