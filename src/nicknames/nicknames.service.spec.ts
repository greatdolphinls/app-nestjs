import { Test, TestingModule } from '@nestjs/testing';
import { NicknamesService } from './nicknames.service';

describe('NicknamesService', () => {
  let service: NicknamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NicknamesService],
    }).compile();

    service = module.get<NicknamesService>(NicknamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
