import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletSchemaName } from '../../models/wallet-schema';
import { Wallet } from '../../interfaces/wallet.interface';
import { Model } from 'mongoose';
import { User } from '../../../user/interfaces/user';
import Decimal from 'decimal.js';

@Injectable()
export class WalletService {

  constructor(
    @InjectModel(WalletSchemaName) private readonly walletModel: Model<Wallet>
  ) {
  }

  /**
   * Creates a new wallet for the given user.
   * @param user The user for which the wallet is created.
   * @returns A promise for the creation.
   */
  async create(user: User): Promise<any>{
    const exists = await this.walletModel.exists({user: user.id});

    // User does already have a wallet, so nothing needs to be created.
    if (exists) {
      return;
    }

    const wallet = new this.walletModel();
    wallet.user = user;
    wallet.balanceNumber = 0;
    await wallet.save();
  }

  /**
   * Checks if a wallet exists with the given userId and if not creates it.
   * @param user The user which wallet is being validated.
   * @returns The result of the validation. If it returns false, a new empty wallet was created for that user.
   */
  async validateWallet(user: User): Promise<boolean> {
    const exists = await this.walletModel.exists({user: user.id});
    if(!exists){
      Logger.debug(`No Wallet existed for the user ${user.username}`);
      // Wallet for the user does not exist so it must be created.
      await this.create(user);
    }
    Logger.debug(`Now a Wallet exists for the user ${user.username}`);
    return exists;
  }

  /**
   * Finds and validates the wallet for the given user.
   * @param user The user for which the wallet is queried for.
   * @returns The queried wallet for the given user.
   */
  async findOne(user: User): Promise<Wallet>{
    await this.validateWallet(user);
    const wallet = await this.walletModel.findOne({user: user.id});

    if(!wallet) throw new InternalServerErrorException("Something has gotten terribly wrong at the creation of a wallet.")
    return wallet;
  }

  async getBalance(user: User): Promise<Decimal>{
    const wallet = await this.findOne(user);
    return wallet.balance;
  }

}