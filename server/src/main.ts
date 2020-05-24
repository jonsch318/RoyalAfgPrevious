import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import cookieParser = require('cookie-parser');
import cors = require('cors');


/**
 * This bootstraps and start the server.
 */
async function bootstrap() {
  // creation of the INestApplication, which intern uses Express.
  const app = await NestFactory.create(AppModule);

  const PORT = 3000;
  // Obviously the secret would not be configured here in a production application.
  app.use(cookieParser("TEMPSECRET"));
  
  // this enables cors for the cookies. In production applications this would be discarded in favor of a reverse proxy.
  app.enableCors(
    {
      origin: true,
      credentials: true, 
    }
  );

  // Activate the server on the given port
  await app.listen(PORT);

  Logger.warn(`Application successfully started listening on port ${PORT}`);
}
bootstrap().then();
