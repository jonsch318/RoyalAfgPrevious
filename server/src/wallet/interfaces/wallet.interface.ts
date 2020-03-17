import { IUser } from '../../user/interfaces/user';
import {Document} from 'mongoose';
import Decimal from 'decimal.js';

export interface Wallet extends Document{
  user: IUser,
  balance: Decimal,
  balanceNumber: number,
}
