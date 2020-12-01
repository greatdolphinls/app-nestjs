import { ApiUseTags, ApiBearerAuth, ApiImplicitQuery, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Controller, Post, Get, Body, UsePipes, UseGuards, ValidationPipe, Query, Req, Delete, Param, Put } from '@nestjs/common';
import { RolesGuard } from '../shared/role.guard';
import { Roles } from '../shared/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GamingConsoleDto, FindManyGamingConsoleDto, GamingConsoleParamDto } from './dto';
import { GamingConsoleService } from './gamingConsoles.service';

const ENTITY = 'Gaming Console';

@ApiUseTags('Gaming Consoles')
@Controller('gaming-consoles')
export class GamingConsolesController {
  constructor(private readonly gamingConsolesService: GamingConsoleService) { }

  @Post()
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async createOne(@Body() newGamingConsoleData: GamingConsoleDto) {
    const { _id } = await this.gamingConsolesService.createOne(newGamingConsoleData);
    return { _id };
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
  public async getMany(@Query() query: FindManyGamingConsoleDto, @Req() req) {
    const count = await this.gamingConsolesService.countAll();
    req.res.header('X-Total-Count', count);
    return this.gamingConsolesService.getMany(query);
  }

  @Get('/:gamingConsoleId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
  @ApiImplicitQuery({ name: 'skip', type: Number, required: false })
  @ApiImplicitQuery({ name: 'sortBy', description: 'entity fields to sortBy', required: false })
  @ApiImplicitQuery({ name: 'where', description: 'entity fields to search by', required: false })
  @ApiResponse({ status: 201, description: `${ENTITY} list found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async getById(@Param() { gamingConsoleId }: GamingConsoleParamDto) {
    return await this.gamingConsolesService.getOne(gamingConsoleId);
  }

  @Put('/:gamingConsoleId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: `${ENTITY} list found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async updateGamingConsoleId(@Param() { gamingConsoleId }: GamingConsoleParamDto, @Body() updateData: GamingConsoleDto): Promise<any> {
    await this.gamingConsolesService.updateOne(gamingConsoleId, updateData);

    return { _id: gamingConsoleId };
  }

  @Delete('/:gamingConsoleId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'gamingConsoleId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully deleted.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async deleteById(@Param() { gamingConsoleId }: GamingConsoleParamDto) {
    await this.gamingConsolesService.deleteOne(gamingConsoleId);
    return true;
  }
}
