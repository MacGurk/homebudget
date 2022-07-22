import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';
import Transaction from '../../db/models/Transaction';
import { TransactionDto } from '../../dto/Transaction.dto';
import { mapper } from '../../mappings/mapper';

export default Router().get('/', async (req: Request, res: Response<TransactionDto[]>) => {
  const month: string = req.query.month as string;
  const year: string = req.query.year as string;
  const userId: string = req.query.userId as string;

  if (!((month && year) || userId)) {
    res.sendStatus(400);
    return;
  }
  let transactions: Transaction[];
  if (month && year) {
    transactions = await TransactionRepository.findByMonthYear(parseInt(month, 10), parseInt(year, 10));
  } else if (userId) {
    transactions = await TransactionRepository.findByUserId(userId);
  }

  res.send(transactions.map((transaction) => mapper.map(transaction, Transaction, TransactionDto)));
});
