import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletSchemaName } from '../../models/wallet-schema';
import { Wallet } from '../../interfaces/wallet.interface';
import { Model } from 'mongoose';
import { IUser } from '../../../user/interfaces/user';
import { WalletService } from '../wallet/wallet.service';

import {Decimal} from 'decimal.js';


@Injectable()
export class PurchaseService {

  constructor(
    private readonly walletService: WalletService,
    @InjectModel(WalletSchemaName) private readonly walletModel: Model<Wallet>
  ) {

  }

  async purchase(user: IUser, amount: number): Promise<any> {
    // Round to top for example 5.10 gets to 6, because we represent the balance 10 as 10 cents and not 10 euros. We take the absolute Value (abs) to get only positive numbers.
    const decimal = new Decimal(amount).ceil().abs();
    const wallet = await this.walletService.findOne(user);

    if(new Decimal(wallet.balance).comparedTo(decimal) < 0){
      Logger.error(`User tried to purchase without money`);
      throw new BadRequestException("The user has not enough money for that purchase");
    }

    wallet.balance = wallet.balance.minus(decimal);
    Logger.debug(`New balance is ${wallet.balanceNumber}`);

    await wallet.save();
    return wallet;
  }

  async deposit(user: IUser, amount: number): Promise<Wallet>{

    // Round to top for example 5.10 gets to 6, because we represent the balance 10 as 10 cents and not 10 euros. We take the absolute Value (abs) to get only positive numbers.
    const decimal = new Decimal(amount).ceil().abs();

    const wallet = await this.walletService.findOne(user);
    wallet.balance = wallet.balance.plus(decimal);

    await wallet.save();
    return wallet;
  }

}
