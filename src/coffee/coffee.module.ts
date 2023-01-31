import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
@Module({
  // four parts
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])], // 启动程序，将typeorm注册到此实体中，创建相应的表
  controllers: [CoffeeController], // api根服务
  providers: [CoffeeService], // 由nest injector实例化，防止实例化两次在app.module.ts需要删掉
  // imports
  // export
})
export class CoffeeModule {}
