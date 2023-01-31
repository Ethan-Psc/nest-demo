import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flavor } from 'src/coffee/entities/flavor.entity';
@Injectable()
export class FlavorService {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  findAll() {
    return this.flavorRepository.find();
  }
}
