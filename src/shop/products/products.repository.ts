import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../../shared/services/dbEntity.service';
import { IProduct, IProductModelData } from './interfaces/product.interface';

interface IProductModel extends IProductModelData, Document { }

@Injectable()
export class ProductsRepository extends DbEntityService<Model<IProductModel>, IProduct, any> {
  constructor(
    @InjectModel('Shop.Product')
    readonly model: Model<IProductModel>,
  ) {
    super(model);
  }

  public findByName(name: string): Promise<IProductModel> {
    return this.model.findOne({ name }).exec();
  }
}
