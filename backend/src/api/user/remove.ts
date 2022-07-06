import { Request, Response, Router } from 'express';
import { UserDto } from '../../dto/User.dto';
import UserRepository from '../../db/repository/UserRepository';

export default Router().delete('/:userId', async (req: Request, res: Response<UserDto>) => {
  const id = req.params.userId;
  const user = await UserRepository.findById(id);

  if (user == null) {
    res.sendStatus(404);
    return;
  }

  await UserRepository.delete(id);

  res.sendStatus(204);
});
