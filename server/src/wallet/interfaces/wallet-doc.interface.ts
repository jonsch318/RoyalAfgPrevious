import { Document } from 'mongoose';
import { IUserDoc } from '../../user/interfaces/user-doc.interface';
import Decimal from 'decimal.js';

export interface IWalletDoc extends Document {
  user: IUserDoc;
  balance: Decimal;
  balanceNumber: number;
}
