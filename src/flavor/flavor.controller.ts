import { Controller, Get } from '@nestjs/common';
import { FlavorService } from './flavor.service';
@Controller('flavor')
export class FlavorController {
  constructor(private readonly flavorService: FlavorService) {}
  @Get()
  findAll() {
    return this.flavorService.findAll();
  }
}
