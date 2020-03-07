import { User } from '../../user/interfaces/user';
import {Document} from 'mongoose';
import Decimal from 'decimal.js';

export interface Wallet extends Document{
  user: User,
  balance: Decimal,
  balanceNumber: number,
}
