import { Router } from 'express';
import list from './list';
import create from './create';
import read from './read';
import update from './update';
import updatePassword from './updatePassword';

export default Router()
  .get('/', list)
  .get('/:userId', read)
  .post('/', create)
  .put('/:userId', update)
  .put('/:userId/updatePassword', updatePassword);
