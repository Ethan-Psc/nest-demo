import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/event/entities/event.entity';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
// useFactor的用法
@Injectable()
export class InjectTestClass {
  create() {
    return ['tyj', 'tyj2'];
  }
}
@Module({
  // four parts
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // 启动程序，将typeorm注册到此实体中，创建相应的表
  controllers: [CoffeeController], // api根服务
  providers: [
    {
      provide: CoffeeService,
      useClass: CoffeeService,
    },
    InjectTestClass,
    // 自定义提供者模式，useClass、useValue、useFactor
    {
      provide: 'COFFEE_BRAND',
      // useFactory: (injectTestClass: InjectTestClass) =>
      //   injectTestClass.create(),
      // inject: [InjectTestClass],
      inject: [Connection],
      useFactory: async (connection: Connection) => {
        const res = await Promise.all(['tyj', 'tyj2']);
        return res;
      },
    },
  ], // 由nest injector实例化，防止实例化两次在app.module.ts需要删掉
  // imports
  // export
})
export class CoffeeModule {}
