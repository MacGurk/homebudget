import { Request, Response, Router } from 'express';
import TransactionRepository from '../../db/repository/TransactionRepository';

export default Router().get('/years', async (req: Request, res: Response<number[]>) => {
  const years = await TransactionRepository.getYears();

  res.json(years);
});
