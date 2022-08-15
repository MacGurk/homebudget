import { Router } from 'express';
import transaction from './transaction';
import user from './user';
import auth from './auth';
import jwtAuth from '../middleware/jwtAuth';
import settlement from './settlement';

export default Router()
  .use('/user', user)
  .use('/transaction', transaction)
  .use('/settlement', settlement)
  .use('/login', auth);
