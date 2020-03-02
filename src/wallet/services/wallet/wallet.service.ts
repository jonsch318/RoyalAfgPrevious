import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletSchemaName } from '../../models/wallet-schema';
import { Wallet } from '../../interfaces/wallet.interface';
import { Model } from 'mongoose';
import { User } from '../../../user/interfaces/user';

@Injectable()
export class WalletService {

  constructor(
    @InjectModel(WalletSchemaName) private readonly walletModel: Model<Wallet>
  ) {
  }

  async create(user: User): Promise<any>{
    const exists = await this.walletModel.exists({user: user.id});

    // User does already have a wallet, so nothing needs to be created.
    if (exists) {
      return;
    }

    const wallet = new this.walletModel();
    wallet.user = user;
    await wallet.save();
  }

}
