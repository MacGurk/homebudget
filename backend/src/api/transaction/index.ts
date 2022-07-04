import { Router } from 'express';
import list from './list';
import create from './create';
import deleteTransaction from './deleteTransaction';
import read from './read';
import update from './update';

export default Router()
  .get('/', list)
  .get('/:transactionid', read)
  .post('/', create)
  .put('/:transactionid', update)
  .delete('/:transactionid', deleteTransaction);
