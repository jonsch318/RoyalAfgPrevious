import { IUser } from '../../user/interfaces/user.interface';
import Decimal from 'decimal.js';

export interface IWallet{
  id: string,
  user: IUser,
  balance: Decimal,
  balanceNumber: number,
}
