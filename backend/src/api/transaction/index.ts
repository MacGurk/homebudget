import { Router } from 'express';
import list from './list';
import create from './create';
import deleteTransaction from './deleteTransaction';
import read from './read';
import update from './update';
import years from './years';
import unsettledAmount from './unsettledAmount';

export default Router()
  .get('/', list)
  .get('/years', years)
  .get('/unsettledAmount', unsettledAmount)
  .get('/:transactionid', read)
  .post('/', create)
  .put('/:transactionid', update)
  .delete('/:transactionid', deleteTransaction);
