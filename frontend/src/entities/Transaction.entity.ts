import { User } from './User.entity';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  price: number;
  settled: boolean;
  user: User;
}
