import { Transaction } from './Transaction.entity';
import { User } from './User.entity';

export interface Settlement {
  user: User;
  transactions: Transaction[];
  settleDifference: number;
}
