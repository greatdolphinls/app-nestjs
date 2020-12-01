import { ApiUseTags, ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Get, Delete, Put, Body, Param, UsePipes, UseGuards, ValidationPipe, Query, Req } from '@nestjs/common';
import { GamesService } from './games.service';
import { RolesGuard } from '../shared/role.guard';
import { Roles } from '../shared/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GameDto, GameUpdateDto, GameParamDto, FindManyGameDto } from './dto';

const ENTITY = 'Game';

@ApiUseTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Post()
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async createOne(@Body() newGameData: GameDto) {
    const { _id } = await this.gamesService.createOne(newGameData);
    return { _id };
  }

  @Get('/:gameId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'gameId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully retrieved.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public getById(@Param() { gameId }: GameParamDto) {
    return this.gamesService.getOne(gameId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
  @ApiImplicitQuery({ name: 'skip', type: Number, required: false })
  @ApiImplicitQuery({ name: 'sortBy', description: 'entity fields to sortBy', required: false })
  @ApiImplicitQuery({ name: 'where', description: 'entity fields to search by', required: false })
  @ApiResponse({ status: 201, description: `${ENTITY} list found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async getMany(@Query() query: FindManyGameDto, @Req() req) {
    const count = await this.gamesService.countAll();
    req.res.header('X-Total-Count', count);

    if (query.quickSearch) {
      return this.gamesService.findByPattern(query);
    }
    return this.gamesService.getMany(query);
  }

  @Delete('/:gameId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'gameId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully deleted.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async deleteById(@Param() { gameId }: GameParamDto) {
    await this.gamesService.deleteOne(gameId);
    return true;
  }

  @Put('/:gameId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'gameId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully updated.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async updateById(@Param() { gameId }: GameParamDto, @Body() updateData: GameUpdateDto) {
    await this.gamesService.updateOne(gameId, updateData);

    return { _id: gameId };
  }

}
