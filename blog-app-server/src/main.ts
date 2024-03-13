import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({ origin: "*" });
  await app.listen(process.env.APP_PORT || 3030);
}
bootstrap();
