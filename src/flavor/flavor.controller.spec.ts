import { Test, TestingModule } from '@nestjs/testing';
import { FlavorController } from './flavor.controller';

describe('FlavorController', () => {
  let controller: FlavorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlavorController],
    }).compile();

    controller = module.get<FlavorController>(FlavorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
