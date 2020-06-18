import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MainController } from './main-controller';

/**
 * Main Module of the application. This invokes all the other modules.
 */
@Module({
  imports: [
    // Enables the usage of the .env file.
    ConfigModule.forRoot(),
    // Enables the connection to the MongoDB Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (_configService: ConfigService) => ({
        // Configures Mongoose to connect with the database. The connection string is located in the .env file. In real world
        // application this would be secret and not published to Github.
        uri: _configService.get<string>('DATABASE_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    // Import the server Modules.
    UserModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [MainController],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(private readonly _configService: ConfigService) {}

  /**
   * This configures the libraries which are natively developed for express.
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CookieParserMiddleware).forRoutes('/');
    CookieParserMiddleware.configure(
      this._configService.get<string>('COOKIE_SECRET'),
      {},
    );
    Logger.log(
      'Cookie Secret: ' + this._configService.get<string>('COOKIE_SECRET'),
    );
    Logger.warn(
      `MongoDb uri: ${this._configService.get<string>(
        'DATABASE_CONNECTION_STRING',
      )}`,
    );
  }
}
