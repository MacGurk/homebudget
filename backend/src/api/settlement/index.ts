import { Router } from 'express';
import list from './list';

export default Router().get('/', list);
