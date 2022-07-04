import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';

export default Router().delete('/:transactionid', async (req: Request, res: Response) => {
  const affected = await TransactionRepository.deleteById(req.params.transactionid);

  if (affected > 0) {
    res.send();
    return;
  }
  res.sendStatus(404);
});
