import { IUser } from '../../user/interfaces/user.interface';
import Decimal from 'decimal.js';

/**
 * A simple interface for the wallet class
 */
export interface IWallet{
  id: string,
  user: IUser,
  balance: Decimal,
  balanceNumber: number,
}
