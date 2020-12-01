import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFilterDto } from './shared/dto/queryFilter.dto';

@Injectable()
export class RequestQueryMapper implements NestMiddleware {

  use(req: Request, _res: Response, next: () => void) {

    const query: QueryFilterDto = req.query;

    if ('limit' in req.query) {
      req.query.limit = query.limit ? parseInt(req.query.limit, 10) : 0;
    }

    if ('skip' in req.query) {
      req.query.skip = query.skip ? parseInt(req.query.skip, 10) : 0;
    }

    if ('where' in req.query) {
      req.query.where = query.where ? JSON.parse(req.query.where) : {};
    }

    if ('sortBy' in req.query) {
      req.query.sortBy = query.sortBy ? JSON.parse(req.query.sortBy) : {};
    }

    if ('quickSearch' in req.query) {
      req.query.quickSearch = query.quickSearch ? query.quickSearch : '';
    }

    next();
  }
}
