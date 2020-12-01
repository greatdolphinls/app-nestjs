import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { GamesRepository } from './games.repository';
import { GameDto, FindManyGameDto } from './dto';
import { IGame } from './interfaces/game.interface';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) { }

  public async createOne(gameData: GameDto): Promise<IGame> {
    const gameFound = await this.gamesRepository.findByName(gameData.name);
    if (!gameFound) {
      return this.gamesRepository.createOne(gameData);
    }
    throw new ConflictException('game exists');
  }

  public async getOne(gameId: string): Promise<IGame> {
    const gameFound = await this.gamesRepository.findOne({ _id: gameId }, null, 'consoleList');
    if (gameFound) {
      return gameFound;
    }
    throw new NotFoundException('game not found');
  }

  public getMany({ ...query }: FindManyGameDto): Promise<IGame[]> {
    query.include = 'consoleList';
    return this.gamesRepository.findMany(query);
  }

  public async deleteOne(gameId: string): Promise<boolean> {
    const gameFound = await this.gamesRepository.findById(gameId);

    if (gameFound) {
      return this.gamesRepository.deleteById(gameId);
    }
    throw new NotFoundException('game not found');
  }

  public async updateOne(gameId: string, updateData: GameDto): Promise<IGame> {
    const gameFound = await this.gamesRepository.findById(gameId);

    if (!gameFound) {
      throw new NotFoundException();
    }

    if (!updateData.name || (updateData.name === gameFound.name)) {
      return this.gamesRepository.findAndUpdateById(gameId, updateData);
    }

    const foundByName = await this.gamesRepository.findByName(updateData.name);

    if (!foundByName) {
      return this.gamesRepository.findAndUpdateById(gameId, updateData);
    }

    throw new ConflictException('game with the same name exists');
  }

  /**
   * Quick search for games. By name fields only. (searches by pattern - RegExp)
   * @param param0
   */
  public findByPattern({ ...query }: FindManyGameDto) {
    return this.gamesRepository.findByPattern('name', query);
  }

  public countAll(): Promise<number> {
    return this.gamesRepository.countAll();
  }
}
