import { ApiUseTags, ApiResponse, ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UserProfilesService } from './userProfiles/userProfiles.service';

import { CreateUserDto, UserParamsDto, FindManyUserDto } from './dto';

import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/role.guard';

import { IUserProfile } from './userProfiles/interfaces/userProfile.interface';
import { UsersEmailService } from './usersEmail.service';
import { UpdateUserProfileDto } from './userProfiles/dto';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userProfilesService: UserProfilesService,
    private readonly usersEmailService: UsersEmailService,
  ) { }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'The user has been successfully found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public getByMe(@Req() { user }): Promise<IUserProfile> {
    const { _id } = user;
    return this.usersService.getById(_id);
  }

  @Put('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public updateMe(@Body() updateData: UpdateUserProfileDto, @Req() { user }) {
    const userId = user._id;
    return this.userProfilesService.updateById(userId, updateData);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 409, description: 'User exists.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const userCreated = await this.usersService.createOne(createUserDto);
    await this.usersEmailService.sendNewUserEmail(userCreated.profile, userCreated.identity);
    return { _id: userCreated.profile._id };
  }

  @Get('/:userId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'userId', type: String })
  @ApiResponse({ status: 201, description: 'The user has been successfully found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public getById(@Param() { userId }: UserParamsDto): Promise<IUserProfile> {
    return this.usersService.getById(userId);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @ApiImplicitQuery({ name: 'limit', required: false, type: Number })
  @ApiImplicitQuery({ name: 'skip', required: false, type: Number })
  @ApiImplicitQuery({ name: 'sortBy', required: false, description: 'entity fields to sortBy' })
  @ApiImplicitQuery({ name: 'where', required: true, description: 'entity fields to search by' })
  @ApiResponse({ status: 201, description: 'The user has been successfully found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async getMany(@Query() query: FindManyUserDto): Promise<IUserProfile[]> {
    // const count = await this.usersService.countExceptIds([req.user._id]);
    // req.res.header('X-Total-Count', count);
    if (query.quickSearch) {
      return this.usersService.findByPattern(query);
    }
    return this.usersService.getMany(query);
  }

  @Put('/:userId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'userId', type: String })
  @ApiResponse({ status: 201, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async updateById(@Param() { userId }: UserParamsDto, @Body() updateData: UpdateUserProfileDto) {
    await this.userProfilesService.updateById(userId, updateData);
    return { _id: userId };
  }

  @Delete('/:userId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'userId', type: String })
  @ApiResponse({ status: 201, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public deleteUser(@Param() { userId }: UserParamsDto): Promise<boolean> {
    return this.usersService.deleteById(userId);
  }
}
