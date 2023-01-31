import { Test, TestingModule } from '@nestjs/testing';
import { FlavorService } from './flavor.service';

describe('FlavorService', () => {
  let service: FlavorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlavorService],
    }).compile();

    service = module.get<FlavorService>(FlavorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
