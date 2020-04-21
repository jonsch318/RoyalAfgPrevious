import {Document} from 'mongoose';
import Decimal from 'decimal.js';
import { IUserDoc } from '../../user/interfaces/user-doc.interface';

export interface IWalletDoc extends Document{
  user: IUserDoc,
  balance: Decimal,
  balanceNumber: number,
}
