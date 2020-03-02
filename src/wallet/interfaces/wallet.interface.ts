import { User } from '../../user/interfaces/user';
import {Document} from 'mongoose';

export interface Wallet extends Document{
  user: User,
  balance: number,
}
