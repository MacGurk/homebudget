import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';
import Transaction from '../../db/models/Transaction';
import { TransactionDto } from '../../dto/Transaction.dto';
import { mapper } from '../../mappings/mapper';
import User from '../../db/models/User';

interface CreateTransactionRequest {
  date: Date;
  user: User;
  description: string;
  price: number;
  settled: boolean;
}

export default Router().post('/', async (req: Request, res: Response<TransactionDto>) => {
  const { date, user, description, price, settled } = req.body as CreateTransactionRequest;

  const transaction = await TransactionRepository.create(date, description, price, user.id, settled);

  res.send(mapper.map(transaction, Transaction, TransactionDto));
});
