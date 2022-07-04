import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';
import {TransactionDto} from '../../dto/Transaction.dto';
import {mapper} from '../../mappings/mapper';
import Transaction from '../../db/models/Transaction';

interface UpdateTransactionRequest {
  date: Date;
  userId: string;
  description: string;
  price: number;
}

export default Router().put('/:transactionid', async (req: Request, res: Response<TransactionDto>) => {
  let transaction = await TransactionRepository.findById(req.params.transactionid);
  if (!transaction) {
    res.status(404).send();
  }
  const { date, userId, description, price } = req.body as UpdateTransactionRequest;

  transaction = await TransactionRepository.update(transaction.id, date, description, price, userId);

  res.send(mapper.map(transaction, Transaction, TransactionDto));
});
