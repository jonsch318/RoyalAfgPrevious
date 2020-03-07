import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';

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
export class AppModule {}
