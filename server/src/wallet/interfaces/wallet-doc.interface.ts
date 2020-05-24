import {Document} from 'mongoose';
import Decimal from 'decimal.js';
import { IUserDoc } from '../../user/interfaces/user-doc.interface';

/**
 * The interface for the wallet class which would be stored in the database
 */
export interface IWalletDoc extends Document{
  user: IUserDoc,
  balance: Decimal,
  balanceNumber: number,
}
