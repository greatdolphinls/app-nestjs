import { ApiUseTags, ApiBearerAuth, ApiImplicitParam, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  Query,
  Req,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductsService } from './products.service';
import { RolesGuard } from '../../shared/role.guard';
import { Roles } from '../../shared/roles.decorator';
import { ProductDto, ProductParamDto, ProductUpdateDto, FindManyProductDto } from './dto';

const ENTITY = 'Products';

@ApiUseTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  async createOne(@Body() newProductData: ProductDto) {
    const result = await this.productsService.createOne(newProductData);
    return { _id: result._id };
  }

  @Get('/shop')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
  @ApiImplicitQuery({ name: 'skip', type: Number, required: false })
  @ApiImplicitQuery({ name: 'sortBy', description: 'entity fields to sortBy', required: false })
  @ApiImplicitQuery({ name: 'where', description: 'entity fields to search by', required: false })
  @ApiResponse({ status: 201, description: `${ENTITY} list found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async getShop(@Query() query: FindManyProductDto, @Req() {res, user}) {
    const rewardProduct = await this.productsService.getReward(query, user._id);
    const shopProducts = await this.productsService.getShop(query);
    res.header('X-Total-Count', shopProducts.length);
    return [...shopProducts, ...rewardProduct];
  }

  @Get('/:productId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'productId', type: String, required: true })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully retrieved.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public getById(@Param() { productId }: ProductParamDto) {
    return this.productsService.getOne(productId);
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
  @ApiResponse({ status: 201, description: `${ENTITY} list found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async getMany(@Query() query: FindManyProductDto, @Req() req) {
    const countQuery = query.where || {};
    const count = await this.productsService.countAll(countQuery);
    req.res.header('X-Total-Count', count);
    return this.productsService.getMany(query);
  }

  @Put('/:productId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'productId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully updated.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async updateById(@Param() { productId }: ProductParamDto, @Body() updateData: ProductUpdateDto) {
    await this.productsService.updateOne(productId, updateData);
    return { _id: productId };
  }

  @Delete('/:productId')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'productId', type: String })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully deleted.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  public async deleteOne(@Param() { productId }: ProductParamDto) {
    await this.productsService.deleteOne(productId);
    return true;
  }
}
