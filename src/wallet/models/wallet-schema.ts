import * as mongoose from 'mongoose';
import { UserSchemaName } from '../../user/models/user-schema';

export const WalletSchemaName = "Wallet";

export const WalletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserSchemaName,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
  },
});
