import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema, WalletSchemaName } from './models/wallet-schema';
import { PurchaseController } from './controllers/purchase/purchase.controller';
import { PurchaseService } from './services/purchase/purchase.service';
import { WalletService } from './services/wallet/wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: WalletSchemaName, schema: WalletSchema}])
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, WalletService],
  exports: [
    WalletService
  ]

})
export class WalletModule {}
