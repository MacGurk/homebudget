import { Request, Response, Router } from 'express';
import { UserDto } from '../../dto/User.dto';
import UserRepository from '../../db/repository/UserRepository';
import TransactionRepository from '../../db/repository/TransactionRepository';
import Settlement from './index';
import { TransactionDto } from '../../dto/Transaction.dto';
import { mapper } from '../../mappings/mapper';
import User from '../../db/models/User';
import transaction from '../transaction';
import Transaction from '../../db/models/Transaction';

interface Settlement {
  user: UserDto;
  transactions: TransactionDto[];
  settleDifference: number;
}

export default Router().get('/', async (req: Request, res: Response<Settlement[]>) => {
  const users = await UserRepository.findAll();
  const totalUnsettled = await TransactionRepository.getTotalUnsettledAmount();
  const settlements = [];

  for (const user of users) {
    const transactions = await TransactionRepository.findByUserId(user.id);
    const userUnsettledAmount = await TransactionRepository.getUnsettledAmountByUser(user.id);
    const settleDifference = userUnsettledAmount - totalUnsettled / users.length;
    const settlement: Settlement = {
      user: mapper.map(user, User, UserDto),
      transactions: transactions.map((transaction) => mapper.map(transaction, Transaction, TransactionDto)),
      settleDifference,
    };
    settlements.push(settlement);
  }

  res.send(settlements);
});
