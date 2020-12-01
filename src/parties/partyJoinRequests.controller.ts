import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Put,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PartyJoinRequestsService } from './partyJoinRequests.service';

import { PartyJoinRequestParamsDto, FindManyPartyJoinRequestDto } from './dto/';
import { IPartyJoinRequest } from './interfaces/partyJoinRequest.interface';

const ENTITY = 'PartyJoinRequest';

@ApiUseTags('PartyJoinRequests')
@Controller('parties/:partyId/join-requests')
export class PartyJoinRequestsController {
  constructor(
    private readonly partyJoinRequestsService: PartyJoinRequestsService,
  ) { }

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
  @ApiImplicitQuery({ name: 'skip', type: Number, required: false })
  @ApiImplicitParam({ name: 'partyId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} array has been successfully retrieved` })
  async getMany(
    @Query() query: FindManyPartyJoinRequestDto,
    @Param() { partyId }: PartyJoinRequestParamsDto,
    @Req() req): Promise<IPartyJoinRequest[]> {
    query.where = { _host: req.user._id, _party: partyId };
    const count = await this.partyJoinRequestsService.countAll(query.where);

    req.res.header('X-Total-Count', count);
    return this.partyJoinRequestsService.findMany(query);
  }

  @Get('/my')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'partyId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} array has been successfully retrieved` })
  getMy(@Param() { partyId }: PartyJoinRequestParamsDto, @Req() { user }): Promise<IPartyJoinRequest> {
    return this.partyJoinRequestsService.findForUserByParty(partyId, user._id);
  }

  @Get('/:partyJoinRequestId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'partyId', type: String })
  @ApiImplicitParam({ name: 'partyJoinRequestId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY}  has been successfully retrieved.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  getOne(@Param() { partyJoinRequestId }: PartyJoinRequestParamsDto, @Req() { user }): Promise<IPartyJoinRequest> {
    return this.partyJoinRequestsService.findForPartyHost(partyJoinRequestId, user._id);
  }

  @Put('/:partyJoinRequestId/approve')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'partyId', type: String })
  @ApiImplicitParam({ name: 'partyJoinRequestId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully updated.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  async approveJoinRequest(@Param() { partyJoinRequestId }: PartyJoinRequestParamsDto, @Req() { user }): Promise<boolean> {
    await this.partyJoinRequestsService.approveJoinRequest(partyJoinRequestId, user._id);
    return true;
  }

  @Delete('/:partyJoinRequestId/reject')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'partyId', type: String })
  @ApiImplicitParam({ name: 'partyJoinRequestId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully deleted.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  async rejectJoinRequest(@Param() { partyJoinRequestId }: PartyJoinRequestParamsDto, @Req() { user }): Promise<boolean> {
    await this.partyJoinRequestsService.rejectJoinRequest(partyJoinRequestId, user._id);
    return true;
  }
}
