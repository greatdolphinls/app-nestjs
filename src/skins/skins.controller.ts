import { Controller, UseGuards, UsePipes, ValidationPipe, Post, Body, Get, Query, Req, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiImplicitQuery, ApiImplicitParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/role.guard';

import { SkinsCreateDto, SkinsFindManyDto, SkinsParamDto, SkinsUpdateDto } from './dto';

import { ISkin } from './skins.interface';
import { SkinsService } from './skins.service';
import { Request } from 'express';

const ENTITY = 'Skins';

@ApiUseTags('Skins')
@Controller('skins')
export class SkinsController {
    constructor(private readonly skinsService: SkinsService) { }

    @Post()
    @ApiBearerAuth()
    @Roles(['USER_ADMIN'])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    createOne(@Body() newSkin: SkinsCreateDto): Promise<ISkin> {
        return this.skinsService.createOne(newSkin);
    }

    @Get()
    @ApiBearerAuth()
    @Roles(['USER_ADMIN'])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
    @ApiImplicitQuery({ name: 'skip', type: Number, required: false })
    @ApiImplicitQuery({ name: 'sortBy', description: 'entity fields to sortBy', required: false })
    @ApiImplicitQuery({ name: 'where', description: 'entity fields to search by', required: false })
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    async getByFilter(@Query() query: SkinsFindManyDto, @Req() req: Request): Promise<ISkin[]> {
        const xTotalCountNicknames = await this.skinsService.countAll();
        req.res.header('X-Total-Count', xTotalCountNicknames.toString());

        if (query.quickSearch) {
            return this.skinsService.findByPattern(query);
        }

        return this.skinsService.findAll(query);
    }

    @Get('/subscription')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    getSkinsForSubscription(): Promise<ISkin[]> {
        return this.skinsService.getSkinsForSubscription();
    }

    @Get('/:skinId')
    @ApiBearerAuth()
    @Roles(['USER_ADMIN'])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiImplicitParam({ name: 'skinId', type: String })
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    getById(@Param() { skinId }: SkinsParamDto): Promise<ISkin> {
        return this.skinsService.findById(skinId);
    }

    @Put('/:skinId')
    @ApiBearerAuth()
    @Roles(['USER_ADMIN'])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiImplicitParam({ name: 'skinId', type: String })
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    updateOne(@Param() { skinId }: SkinsParamDto, @Body() updatedNickname: SkinsUpdateDto): Promise<ISkin> {
        return this.skinsService.updateOne(skinId, updatedNickname);
    }

    @Delete('/:skinId')
    @ApiBearerAuth()
    @Roles(['USER_ADMIN'])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe())
    @ApiImplicitParam({ name: 'skinId', type: String })
    @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
    @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
    @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
    deleteOne(@Param() { skinId }: SkinsParamDto): Promise<ISkin> {
        return this.skinsService.deleteById(skinId);
    }
}
