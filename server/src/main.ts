import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import cookieParser = require('cookie-parser');
import cors = require('cors');



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = 3000;
  app.use(cookieParser("TEMPSECRET"));
  
  // this enables cors for the cookies. In production applications this would be discarded in favor of a reverse proxy.
  app.enableCors(
    {
      origin: true,
      credentials: true, 
    }
  );

  await app.listen(PORT);

  Logger.warn(`Application successfully started listening on port ${PORT}`);
}
bootstrap().then();
