import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}
  @Get()
  findAll(@Query() query) {
    // const { limit, offset } = query;
    // return `all coffee ${limit} ${offset}`;
    return this.coffeeService.findAll(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    // return `${id} coffee`;
    return this.coffeeService.findOne(+id);
  }
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return body;
    return this.coffeeService.create(createCoffeeDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string, @Body() body) {
    return this.coffeeService.remove(id);
  }
}
