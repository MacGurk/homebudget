import { Request, Response, Router } from 'express';
import Auth from '../../service/Auth';

export interface LoginResponse {
  token: string;
}

interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export default Router().post('/', async (req: Request, res: Response<LoginResponse>) => {
  const { usernameOrEmail, password } = req.body as LoginRequest;
  const auth = await Auth.authenticate(usernameOrEmail, password);

  if (auth) {
    res.send({ token: auth.jwt });
  } else {
    res.status(403).send();
  }
});
