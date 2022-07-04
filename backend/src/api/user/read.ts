import {UserDto} from '../../dto/User.dto';
import { Request, Response, Router} from 'express';
import UserRepository from '../../db/repository/UserRepository';
import {mapper} from '../../mappings/mapper';
import User from '../../db/models/User';

export default Router().get('/:userId', async (req: Request, res: Response<UserDto>) => {
  const user = await UserRepository.findById(req.params.userId);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.send(mapper.map(user, User, UserDto));
});
