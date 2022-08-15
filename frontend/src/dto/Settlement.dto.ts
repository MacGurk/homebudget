import { UserDto } from './User.dto';
import { TransactionDto } from './Transaction.dto';

export interface SettlementDto {
  user: UserDto;
  transactions: TransactionDto[];
  settleDifference: number;
}
