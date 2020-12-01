import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, Put, Get, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { RolesGuard } from '../shared/role.guard';
import { Roles } from '../shared/roles.decorator';
import { NicknamesCreateDto, NicknamesParamDto, NicknamesUpdateDto, NicknamesFindManyDto } from './dto';
import { INickname } from './nicknames.interface';
import { NicknamesService } from './nicknames.service';

const ENTITY = 'Nickname';

@ApiUseTags('Nicknames')
@Controller('nicknames')
export class NicknamesController {
    constructor(private readonly nicknamesService: NicknamesService) { }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
    @ApiImplicitQuery({ name: 'skip', type: Number, required: false })
    @ApiImplicitQuery({ name: 'sortBy', description: 'entity fields to sortBy', required: false })
    @ApiImplicitQuery({ name: 'where', description: 'entity fields to search by', required: false })
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    async getByFilter(@Query() query: NicknamesFindManyDto, @Req() req: Request): Promise<INickname[]> {
        const xTotalCountNicknames = await this.nicknamesService.countAll();
        req.res.header('X-Total-Count', xTotalCountNicknames.toString());

        if (query.quickSearch) {
            return this.nicknamesService.findByPattern(query);
        }

        return this.nicknamesService.findAll(query);
    }

    @Get('/:nicknameId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiImplicitParam({ name: 'nicknameId', type: String })
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    getById(@Param() { nicknameId }: NicknamesParamDto): Promise<INickname> {
        return this.nicknamesService.findById(nicknameId);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    createOne(@Body() newNickname: NicknamesCreateDto): Promise<INickname> {
        return this.nicknamesService.createOne(newNickname);
    }

    @Put('/:nicknameId')
    @ApiBearerAuth()
    @Roles(['USER_ADMIN'])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiImplicitParam({ name: 'nicknameId', type: String })
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    updateOne(@Param() { nicknameId }: NicknamesParamDto, @Body() updatedNickname: NicknamesUpdateDto): Promise<INickname> {
        return this.nicknamesService.updateOne(nicknameId, updatedNickname);
    }

    @Delete('/:nicknameId')
    @ApiBearerAuth()
    @Roles(['USER_ADMIN'])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiImplicitParam({ name: 'nicknameId', type: String })
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    deleteOne(@Param() { nicknameId }: NicknamesParamDto): Promise<INickname> {
        return this.nicknamesService.deleteById(nicknameId);
    }
}
