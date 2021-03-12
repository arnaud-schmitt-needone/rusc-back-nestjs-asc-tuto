import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

const port = process.env.PORT;
const origin = process.env.ORIGIN;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const origin = '*';
  app.enableCors({ origin });
  await app.listen(port);

  Logger.log(`Server started runnin on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
