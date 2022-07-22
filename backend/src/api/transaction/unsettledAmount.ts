import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';

export default Router().get('/unsettledAmount', async (req: Request, res: Response<number>) => {
  const userId: string = req.query.userId as string;

  if (!userId) {
    res.sendStatus(400);
    return;
  }

  const unsettledAmount = await TransactionRepository.getUnsettledAmountByUser(userId);

  res.json(unsettledAmount);
});
