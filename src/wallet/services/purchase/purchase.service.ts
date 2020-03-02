import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletSchemaName } from '../../models/wallet-schema';
import { Wallet } from '../../interfaces/wallet.interface';
import { Model } from 'mongoose';
import { User } from '../../../user/interfaces/user';

@Injectable()
export class PurchaseService {

  constructor(
    @InjectModel(WalletSchemaName) private readonly walletModel: Model<Wallet>
  ) {

  }

  async purchase(user: User, amount: number): Promise<any> {
    const wallet = await this.walletModel.findOne({user: user.id});

    const rounded = Math.round(amount);

    if(wallet.balance < rounded){
      throw new BadRequestException("The user has not enough money for that purchase");
    }

    wallet.balance = wallet.balance - rounded;

    await wallet.save();

    return wallet;
  }
}
