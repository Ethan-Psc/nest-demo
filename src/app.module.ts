import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlavorModule } from './flavor/flavor.module';
// class-validate无法使用
// typeorm迁移功能无法使用 
@Module({
  imports: [
    CoffeeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, // 自动为使用@Entity装饰器的实体生成一个SQL表，以及包含他们的元数据
    }),
    FlavorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
