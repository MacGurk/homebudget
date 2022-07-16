import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';
import { TransactionDto } from '../../dto/Transaction.dto';
import User from '../../db/models/User';

interface UpdateTransactionRequest {
  date: Date;
  user: User;
  description: string;
  price: number;
  settled: boolean;
}

export default Router().put('/:transactionid', async (req: Request, res: Response<TransactionDto>) => {
  const transaction = await TransactionRepository.findById(req.params.transactionid);
  if (!transaction) {
    res.status(404).send();
    return;
  }
  const { date, user, description, price, settled } = req.body as UpdateTransactionRequest;

  const affectedRows = await TransactionRepository.update(
    req.params.transactionid,
    date,
    description,
    price,
    user.id,
    settled,
  );

  if (affectedRows == 0) {
    res.sendStatus(400);
    return;
  }

  res.sendStatus(204);
});
