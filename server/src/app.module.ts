import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from "path";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { logger } from 'codelyzer/util/logger';

@Module({
  imports:
    [
      ConfigModule.forRoot(),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, "..", "static"),
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (_configService: ConfigService) => ({
          uri: _configService.get<string>("DATABASE_CONNECTION_STRING"),
        }),
        inject: [ConfigService],
      }),
      UserModule,
      AuthModule,
      WalletModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{

  constructor(private readonly _configService: ConfigService) {
  }

  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CookieParserMiddleware).forRoutes("/");
    CookieParserMiddleware.configure(this._configService.get<string>("COOKIE_SECRET"), {});
    Logger.log("Cookie Secret: " + this._configService.get<string>("COOKIE_SECRET"))
  }

}
