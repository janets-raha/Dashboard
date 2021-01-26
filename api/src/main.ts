import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept, Authorization",
  });
  //app.use(requestIp.mw());
  await app.listen(3001);
}


bootstrap();
