import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Get,
  Post,
  Put,
  Body,
} from '@nestjs/common';

import { ChatsService } from './chats.service';
import { ChatUserCreateDto } from './dto';

@ApiUseTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
  ) { }

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'The user has been successfully found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public getByMe(): Promise<any> {
    // const { _id } = user;
    return this.chatsService.test();
  }

  /**
   * Create Pusher User
   *
   */
  @Post('/user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async createChatUser(@Body() chatUserCreateDto: ChatUserCreateDto): Promise<boolean> {
    return await this.chatsService.createChatUser(chatUserCreateDto);
  }

  /**
   * Update Pusher User
   *
   */
  @Put('/user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async updateChatUser(@Body() chatUserCreateDto: ChatUserCreateDto): Promise<boolean> {
    return await this.chatsService.updateChatUser(chatUserCreateDto);
  }
}
