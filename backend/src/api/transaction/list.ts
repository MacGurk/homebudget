import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';
import Transaction from '../../db/models/Transaction';
import {TransactionDto} from '../../dto/Transaction.dto';
import {mapper} from '../../mappings/mapper';

export default Router().get('/', async (req: Request, res: Response<TransactionDto[]>) => {
  const transactions = await TransactionRepository.findAll();

  res.send(transactions.map((transaction) => mapper.map(transaction, Transaction, TransactionDto)));
});
