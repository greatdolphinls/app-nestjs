import { Injectable } from '@nestjs/common';
import { INickname } from './nicknames.interface';
import { NicknamesCreateDto, NicknamesUpdateDto, NicknamesFindManyDto } from './dto';
import { NicknamesRepository } from './nicknames.repository';

@Injectable()
export class NicknamesService {
    constructor(private readonly nicknamesRepository: NicknamesRepository) { }

    public createOne(newNickname: NicknamesCreateDto): Promise<INickname> {
        return this.nicknamesRepository.createOne(newNickname);
    }

    public updateOne(nicknameId: string, updatedNickname: NicknamesUpdateDto): Promise<INickname> {
        return this.nicknamesRepository.findAndUpdateById(nicknameId, updatedNickname);
    }

    public deleteById(nicknameId: string): Promise<INickname> {
        return this.nicknamesRepository.deleteById(nicknameId);
    }

    public findAll(query: NicknamesFindManyDto): Promise<INickname[]> {
        return this.nicknamesRepository.findMany(query);
    }

    public findById(nicknameId: string): Promise<INickname> {
        return this.nicknamesRepository.findById(nicknameId);
    }

    public findByNickname(nickname: string): Promise<INickname> {
        return this.nicknamesRepository.findByNickname(nickname);
    }

    public findByPattern({ ...query }: NicknamesFindManyDto) {
        return this.nicknamesRepository.findByPattern('nickname', query);
    }

    public countAll(): Promise<number> {
        return this.nicknamesRepository.countAll();
    }
}
