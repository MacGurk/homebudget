import { UserDto } from './User.dto';

export interface TransactionDto {
  id: string;
  date: Date;
  description: string;
  price: number;
  settled: boolean;
  user: UserDto;
}
