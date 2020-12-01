import { Document, Model, Types } from 'mongoose';
import { QueryFilterDto } from '../dto';

interface IPopulate {
  path: string;
  select: string;
}

export class DbEntityService<Entity extends Model<Document>, TOperationInsert, TOperationUpdate> {

  public model: Entity;

  constructor(model: Entity) {
    this.model = model;
  }

  private toObjectId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }

  public async createOne(data: TOperationInsert): Promise<any> {
    return this.model.create(data);
  }

  public findById(id: string): Promise<any> {
    return this.model.findById(id).exec();
  }

  public findOne(query: any, projection?: string, options?: any, populate?: string | IPopulate[]): Promise<any> {
    const projectionFields = projection || '';
    const optionsToSet = {...options, lean: true};
    const populateFields = populate || '';
    return this.model.findOne(query, projectionFields, optionsToSet).populate(populateFields).exec();
  }

  public findMany(query: QueryFilterDto): Promise<any[]> {
    const whereQuery = query.where || {};
    const populate = query.includeO || query.include || '';
    const select = query.select || '';
    const limit = query.limit || 100;
    const skip = query.skip || 0;

    return this.model.find(whereQuery).select(select).limit(limit).skip(skip).lean(true).sort(query.sortBy).populate(populate).exec();
  }

  public findByPattern(field: string, query: QueryFilterDto): Promise<any[]> {
    const populate = query.include || '';
    return this.model.find({ [field]: RegExp(query.quickSearch) })
      .limit(query.limit).skip(query.skip).lean(true).sort(query.sortBy).populate(populate).exec();
  }

  public deleteById(id: string): Promise<any> {
    return this.model.deleteOne({ _id: id }).exec();
  }

  public delete(query: any): Promise<any> {
    return this.model.deleteOne(query).exec();
  }

  public async findAndUpdateById(id: string, updateData: TOperationUpdate): Promise<any> {
    return this.model.findOneAndUpdate({ _id: this.toObjectId(id) }, { $set: updateData }, { new: true }).exec();
  }

  public updateOne(query: any, updateData: TOperationUpdate, params: object = {}): Promise<any> {
    return this.model.findOneAndUpdate(query, { $set: updateData }, params).exec();
  }

  public update(query: any, updateData: TOperationUpdate): Promise<any> {
    return this.model.findOneAndUpdate(query, updateData).exec();
  }

  public countAll(query?: any): Promise<number> {
    const countQuery = query || {};
    return this.model.countDocuments(countQuery).exec();
  }
}
