import {Router} from 'express';
import {body} from 'express-validator';
import inputValidation from '../../middleware/inputValidation';
import login from './login';

export default Router().post('/',
  body('usernameOrEmail').not().isEmpty(),
  body('password').not().isEmpty(),
  inputValidation,
  login
);
