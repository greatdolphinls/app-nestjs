import { Injectable } from '@nestjs/common';

import { SkinsCreateDto, SkinsFindManyDto, SkinsUpdateDto } from './dto';
import { ISkin } from './skins.interface';

import { SkinsRepository } from './skins.repository';

@Injectable()
export class SkinsService {
    constructor(private readonly skinsRepository: SkinsRepository) {}

    public createOne(newSkin: SkinsCreateDto): Promise<ISkin> {
        return this.skinsRepository.createOne(newSkin);
    }

    public findById(skinId: string): Promise<ISkin> {
        return this.skinsRepository.findById(skinId);
    }

    public findAll(query: SkinsFindManyDto): Promise<ISkin[]> {
        return this.skinsRepository.findMany(query);
    }

    public findByPattern({ ...query }: SkinsFindManyDto) {
        return this.skinsRepository.findByPattern('name', query);
    }

    public getSkinsForSubscription(): Promise<ISkin[]> {
        return this.skinsRepository.findMany({
            where: {
                toSubScribe: true,
            },
        });
    }

    public updateOne(skinId: string, updatedNickname: SkinsUpdateDto): Promise<ISkin> {
        return this.skinsRepository.findAndUpdateById(skinId, updatedNickname);
    }

    public deleteById(skinId: string): Promise<ISkin> {
        return this.skinsRepository.deleteById(skinId);
    }

    public countAll(): Promise<number> {
        return this.skinsRepository.countAll();
    }
}
