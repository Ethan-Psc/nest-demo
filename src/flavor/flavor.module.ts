import { Module } from '@nestjs/common';
import { FlavorController } from './flavor.controller';
import { FlavorService } from './flavor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from 'src/coffee/entities/flavor.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Flavor])],
  controllers: [FlavorController],
  providers: [FlavorService],
})
export class FlavorModule {}
