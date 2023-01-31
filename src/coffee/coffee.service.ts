import {
  HttpException,
  Injectable,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  async findAll() {
    return await this.coffeeRepository.find({ relations: ['flavors'] });
  }
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preLoadFlavorByName(name)),
      ));
    // 首先看实体存在，如果存在那么将更新实体，否则返回undefined
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) throw new NotFoundException(`Coffee ${id} not found`);
    return this.coffeeRepository.save(coffee);
  }
  async remove(id: string) {
    const coffee = await this.coffeeRepository.findOneBy({ id: +id });
    return this.coffeeRepository.remove(coffee);
  }
  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }
  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preLoadFlavorByName(name)),
    );
    const coffee = await this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }
  private async preLoadFlavorByName(name: string): Promise<Flavor> {
    const existedFlavor = await this.flavorRepository.findOne({
      where: { name: name },
    });
    if (existedFlavor) return existedFlavor;
    return await this.flavorRepository.create({ name: name });
  }
}
