import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { GamingConsolesRepository } from './gamingConsoles.repository';
import { IGamingConsole } from './interfaces/gamingConsole.interface';
import { FindManyGamingConsoleDto, GamingConsoleDto } from './dto';

@Injectable()
export class GamingConsoleService {
  constructor(private readonly gamingConsolesRepository: GamingConsolesRepository) { }

  public async createOne(createGamingConsoleData: IGamingConsole): Promise<IGamingConsole> {
    const foundByName = await this.gamingConsolesRepository.findByName(createGamingConsoleData.name);
    if (foundByName) {
      throw new ConflictException();
    }
    return this.gamingConsolesRepository.createOne(createGamingConsoleData);
  }

  public async getOne(gamingConsoleId: string): Promise<IGamingConsole> {
    const gamingConsoleFound = await this.gamingConsolesRepository.findOne({ _id: gamingConsoleId });
    if (gamingConsoleFound) {
      return gamingConsoleFound;
    }
    throw new NotFoundException('gamingConsole not found');
  }

  public async updateOne(gamingConsoleId: string, updateData: GamingConsoleDto): Promise<IGamingConsole> {
    const gamingPlaceFound = await this.gamingConsolesRepository.findById(gamingConsoleId);

    if (gamingPlaceFound) {
      return this.gamingConsolesRepository.findAndUpdateById(gamingConsoleId, updateData);
    }
    throw new NotFoundException('gamingConsole not found');
  }

  public async deleteOne(gamingConsoleId: string): Promise<boolean> {
    const gamingConsoleFound = await this.gamingConsolesRepository.findById(gamingConsoleId);

    if (gamingConsoleFound) {
      return this.gamingConsolesRepository.deleteById(gamingConsoleId);
    }
    throw new NotFoundException('gamingConsole not found');
  }

  public getMany(query: FindManyGamingConsoleDto): Promise<IGamingConsole[]> {
    return this.gamingConsolesRepository.findMany(query);
  }

  public countAll(): Promise<number> {
    return this.gamingConsolesRepository.countAll();
  }
}
