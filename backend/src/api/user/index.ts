import { Router } from 'express';
import list from './list';
import create from './create';
import read from './read';

export default Router().get('/', list).get('/:userId', read).post('/', create);
