import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletSchemaName } from '../../models/wallet-schema';
import { Model } from 'mongoose';
import { WalletService } from '../wallet/wallet.service';

import {Decimal} from 'decimal.js';
import { IUserDoc } from '../../../user/interfaces/user-doc.interface';
import { IWalletDoc } from '../../interfaces/wallet-doc.interface';

/**
 * Enables deposit and purchase transaction
 */
@Injectable()
export class PurchaseService {

  constructor(
    private readonly walletService: WalletService,
    @InjectModel(WalletSchemaName) private readonly walletModel: Model<IWalletDoc>
  ) {

  }

  /**
   * Executes a new purchase.
   * @param user The user associated with the purchase
   * @param amount The amount purchased.
   */
  async purchase(user: IUserDoc, amount: number): Promise<any> {
    // Round to top for example 5.10 gets to 6, because we represent the balance 10 as 10 cents and not 10 euros. We take the absolute Value (abs) to get only positive numbers.
    const decimal = new Decimal(amount).ceil().abs();
    const wallet = await this.walletService.findOne(user);

    // Check if user has enough money to purchase the given amount.
    if(new Decimal(wallet.balance).comparedTo(decimal) < 0){
      Logger.error(`User tried to purchase without money`);
      throw new BadRequestException("The user has not enough money for that purchase");
    }

    // Subtract the amount
    wallet.balance = wallet.balance.minus(decimal);
    Logger.debug(`New balance is ${wallet.balanceNumber}`);

    // Save changes to the database
    await wallet.save();
    return wallet;
  }

  /**
   * Executes a new deposition
   * @param user The user associated with the deposition
   * @param amount The amount to be deposited
   */
  async deposit(user: IUserDoc, amount: number): Promise<IWalletDoc>{

    // Round to top for example 5.10 gets to 6, because we represent the balance 10 as 10 cents and not 10 euros. We take the absolute Value (abs) to get only positive numbers.
    const decimal = new Decimal(amount).ceil().abs();

    // find the wallet associated with the user.
    const wallet = await this.walletService.findOne(user);
    wallet.balance = wallet.balance.plus(decimal);

    // Save changes to the database.
    await wallet.save();
    return wallet;
  }

}
