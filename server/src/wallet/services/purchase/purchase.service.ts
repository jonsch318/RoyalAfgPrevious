import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletSchemaName } from '../../models/wallet-schema';
import { Model } from 'mongoose';
import { WalletService } from '../wallet/wallet.service';

import {Decimal} from 'decimal.js';
import { IUserDoc } from '../../../user/interfaces/user-doc.interface';
import { IWalletDoc } from '../../interfaces/wallet-doc.interface';


@Injectable()
export class PurchaseService {

  constructor(
    private readonly walletService: WalletService,
    @InjectModel(WalletSchemaName) private readonly walletModel: Model<IWalletDoc>
  ) {

  }

  async purchase(user: IUserDoc, amount: number): Promise<any> {
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

  async deposit(user: IUserDoc, amount: number): Promise<IWalletDoc>{

    // Round to top for example 5.10 gets to 6, because we represent the balance 10 as 10 cents and not 10 euros. We take the absolute Value (abs) to get only positive numbers.
    const decimal = new Decimal(amount).ceil().abs();

    const wallet = await this.walletService.findOne(user);
    wallet.balance = wallet.balance.plus(decimal);

    await wallet.save();
    return wallet;
  }

}
