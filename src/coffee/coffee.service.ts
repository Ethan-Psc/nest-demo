import {
  HttpException,
  Injectable,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity';
import { QueryDto } from '../common/dto/query.dto';
import { Event } from 'src/event/entities/event.entity';
import { query } from 'express';
@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    @Inject('COFFEE_BRAND') brand: string[],
  ) {
    console.log(brand);
  }
  async findAll(queryDto: QueryDto) {
    const { limit, offset } = queryDto;
    return await this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }
  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // 创建事务，
    try {
      coffee.recommendation++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
