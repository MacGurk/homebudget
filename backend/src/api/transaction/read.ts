import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';
import Transaction from '../../db/models/Transaction';
import {TransactionDto} from '../../dto/Transaction.dto';
import {mapper} from '../../mappings/mapper';

export default Router().get('/:transactionId', async (req: Request, res: Response<TransactionDto>) => {
  const transaction = await TransactionRepository.findById(req.params.transactionId);

  res.send(mapper.map(transaction, Transaction, TransactionDto));
});
