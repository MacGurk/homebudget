import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';
import Transaction from '../../db/models/Transaction';
import {TransactionDto} from '../../dto/Transaction.dto';
import {mapper} from '../../mappings/mapper';

interface CreateTransactionRequest {
  date: Date;
  userId: string;
  description: string;
  price: number;
}

export default Router().post('/', async (req: Request, res: Response<TransactionDto>) => {
  const { date, userId, description, price } = req.body as CreateTransactionRequest;

  const transaction = await TransactionRepository.create(date, description, price, userId);

  res.send(mapper.map(transaction, Transaction, TransactionDto));
});
