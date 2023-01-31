import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true, // 将你的负载转换为期待的类型的实例,将参数类型隐式转换为期望值
  //     disableErrorMessages: false,
  //   }),
  // ); // 自动校验传入的负载是否有效
  // class-validator 在本地暂时无法使用
  const option = new DocumentBuilder()
    .setTitle('api')
    .setDescription('coffee api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
