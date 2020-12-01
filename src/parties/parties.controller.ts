import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PartiesService } from './parties.service';

import { FindManyPartyDto, PartyParamsDto, PartyDto, FindManyMyPartyDto } from './dto/';
import { IParty } from './interfaces/party.interface';

const ENTITY = 'Party';

@ApiUseTags('Parties')
@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  async createOne(@Body() newPartyData: PartyDto, @Req() { user }): Promise<{ _id: string }> {
    const { _id } = await this.partiesService.createOne(newPartyData, user._id);
    return { _id: _id.toString() };
  }

  @Get('/my')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitQuery({ name: 'relationType', type: String, required: false })
  @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
  @ApiImplicitQuery({ name: 'skip', type: Number, required: false })
  @ApiResponse({ status: 201, description: `${ENTITY} array has been successfully retrieved.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  getMy(@Query() query: FindManyMyPartyDto, @Req() { user }): Promise<IParty[]> {
    return this.partiesService.findMyParties(user._id, query);
  }

  @Get('/:partyId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'partyId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY}  has been successfully retrieved.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  getOne(@Param() { partyId }: PartyParamsDto): Promise<IParty> {
    return this.partiesService.findById(partyId);
  }

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
  @ApiImplicitQuery({ name: 'skip', type: Number, required: false })
  @ApiImplicitQuery({ name: 'sortBy', description: 'entity fields to sortBy', required: false })
  @ApiImplicitQuery({ name: 'where', description: 'entity fields to search by', required: false })
  @ApiResponse({ status: 201, description: `${ENTITY} array has been successfully retrieved` })
  async getMany(@Query() query: FindManyPartyDto, @Req() req): Promise<IParty[]> {
    const count = await this.partiesService.countAll();
    req.res.header('X-Total-Count', count);
    return this.partiesService.findMany(query);
  }

  @Put('/:partyId/join')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'partyId', type: String })
  @ApiResponse({ status: 201, description: `Successfully joined ${ENTITY}` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  async joinOne(@Param() { partyId }: PartyParamsDto, @Req() { user }): Promise<{ _id: string }> {
    const joinResult = await this.partiesService.joinParty(partyId, user._id);
    return { _id: joinResult._id.toString() };
  }

  @Put('/:partyId/quit')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'partyId', type: String })
  @ApiResponse({ status: 201, description: `Successfully quit ${ENTITY}` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  quitOne(@Param() { partyId }: PartyParamsDto, @Req() { user }): Promise<boolean> {
    return this.partiesService.quitParty(partyId, user._id);
  }

  @Delete('/:partyId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'partyId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully deleted.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  deleteOne(@Param() params, @Req() { user }): Promise<boolean> {
    return this.partiesService.deleteOneByUser(params.partyId, user._id);
  }
}
