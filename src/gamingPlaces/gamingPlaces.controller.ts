import { ApiUseTags, ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Get, Delete, Put, Body, Param, UsePipes, UseGuards, ValidationPipe, Query, Req } from '@nestjs/common';
import { GamingPlacesService } from './gamingPlaces.service';
import { RolesGuard } from '../shared/role.guard';
import { Roles } from '../shared/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GamingPlaceDto, GamingPlaceUpdateDto, FindManyGamingPlaceDto, GamingPlaceParamDto } from './dto';

const ENTITY = 'Gaming Place';

@ApiUseTags('Gaming-Places')
@Controller('gaming-places')
export class GamingPlacesController {
  constructor(private readonly gamingPlacesService: GamingPlacesService) { }

  @Post()
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async createGamingPlace(@Body() newGamingPlaceData: GamingPlaceDto): Promise<any> {
    const { _id } = await this.gamingPlacesService.createOne(newGamingPlaceData);
    return { _id };
  }

  @Get('/:gamingPlaceId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'gamingPlaceId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully retrieved.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public getGamingPlaceById(@Param() { gamingPlaceId }: GamingPlaceParamDto) {
    return this.gamingPlacesService.getOne(gamingPlaceId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitQuery({ name: 'quickSearch', type: Boolean, required: false })
  @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
  @ApiImplicitQuery({ name: 'skip', type: Number, required: false })
  @ApiImplicitQuery({ name: 'sortBy', description: 'entity fields to sortBy', required: false })
  @ApiImplicitQuery({ name: 'where', description: 'entity fields to search by', required: false })
  @ApiImplicitQuery({ name: 'location', description: 'location to search in', required: false })
  @ApiResponse({ status: 201, description: `${ENTITY} list found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async getManyGamingPlaces(@Query() query: FindManyGamingPlaceDto, @Req() req) {
    const count = await this.gamingPlacesService.countAll();
    req.res.header('X-Total-Count', count);

    if (query.quickSearch) {
      return this.gamingPlacesService.findByPattern(query);
    }

    if (query.where && query.where.location) {
      return this.gamingPlacesService.getManyInLocation(query);
    }
    return this.gamingPlacesService.getMany(query);
  }

  @Delete('/:gamingPlaceId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'gamingPlaceId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully deleted.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async deleteGamingPlaceById(@Param() { gamingPlaceId }: GamingPlaceParamDto): Promise<boolean> {
    await this.gamingPlacesService.deleteOne(gamingPlaceId);
    return true;
  }

  @Put('/:gamingPlaceId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'gamingPlaceId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully updated.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async updateGamingPlaceById(@Param() { gamingPlaceId }: GamingPlaceParamDto, @Body() updateData: GamingPlaceUpdateDto): Promise<any> {
    await this.gamingPlacesService.updateOne(gamingPlaceId, updateData);

    return { _id: gamingPlaceId };
  }

}
