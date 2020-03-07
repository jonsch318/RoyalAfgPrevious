import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { CorsMiddleware } from '@nest-middlewares/cors';

@Module({
  imports:
    [
      MongooseModule.forRoot('mongodb://127.0.0.1:27017/RoyalAfg'),
      UserModule,
      AuthModule,
      WalletModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CookieParserMiddleware, CorsMiddleware).forRoutes("/");
    CookieParserMiddleware.configure("TEMPSECRET", {});
  }

}
