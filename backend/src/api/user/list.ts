import { Router, Response, Request } from 'express';
import UserRepository from '../../db/repository/UserRepository';
import { UserDto } from '../../dto/User.dto';
import User from '../../db/models/User';
import { mapper } from '../../mappings/mapper';

export default Router().get('/', async (req: Request, res: Response<UserDto[]>) => {
  const users = await UserRepository.findAll();

  res.send(users.map((user: UserDto) => mapper.map(user, User, UserDto)));
});
