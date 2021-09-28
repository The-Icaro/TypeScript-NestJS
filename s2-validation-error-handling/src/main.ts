import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); 
  await app.listen(3000); 
}
bootstrap();

// Create a New Nest Js App, and listen on port 3000
// localhost:3000

// for useGlobalPipes: 
// whenever Nest find those Decorators Pipes, it will auto run the validation