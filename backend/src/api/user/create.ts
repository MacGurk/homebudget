import { Request, Response, Router } from 'express';
import UserRepository from '../../db/repository/UserRepository';
import {UserDto} from '../../dto/User.dto';
import User from '../../db/models/User';
import {mapper} from '../../mappings/mapper';

interface Error {
  message: string;
}

interface CreateRequest {
  username: string;
  email: string;
  password: string;
}

type CreateResponse = UserDto | Error;

export default Router().post('/', async (req: Request, res: Response<CreateResponse>) => {
  const { username, email, password } = req.body as CreateRequest;

  if (await UserRepository.existsByUsername(username)) {
    res.status(400).send({ message: 'Username is already in use' });
    return;
  }
  if (await UserRepository.existsByEmail(email)) {
    res.status(400).send({ message: 'Email is already in use' });
    return;
  }

  const user = await UserRepository.create(username, email, password);

  res.status(201).send(mapper.map(user, User, UserDto));
});
