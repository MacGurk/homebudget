import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';
import Transaction from '../../db/models/Transaction';
import { TransactionDto } from '../../dto/Transaction.dto';
import { mapper } from '../../mappings/mapper';

export default Router().get('/', async (req: Request, res: Response<TransactionDto[]>) => {
  const month: string = req.query.month as string;
  const year: string = req.query.year as string;

  if (!(month && year)) {
    res.sendStatus(400);
    return;
  }

  const transactions = await TransactionRepository.findByMonthYear(parseInt(month, 10), parseInt(year, 10));

  res.send(transactions.map((transaction) => mapper.map(transaction, Transaction, TransactionDto)));
});
