import { NestFactory } from '@nestjs/core';
import { AppModule, } from './app.module.js';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {

  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )
  const port = env.Port
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`server is running on port ${port}`);

  });
}
await bootstrap();
