import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); 
}
bootstrap();

// Create a New Nest Js App, and listen on port 3000
// localhost:3000