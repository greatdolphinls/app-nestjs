import { Test, TestingModule } from '@nestjs/testing';
import { NicknamesController } from './nicknames.controller';

describe('Nicknames Controller', () => {
  let controller: NicknamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NicknamesController],
    }).compile();

    controller = module.get<NicknamesController>(NicknamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
