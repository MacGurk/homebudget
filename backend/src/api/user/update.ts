import { Request, Response, Router } from 'express';
import UserRepository from '../../db/repository/UserRepository';

interface UpdateUserRequest {
  id: string;
  username: string;
  email: string;
}

export default Router().put('/:userId', async (req: Request, res: Response) => {
  const { id, username, email } = req.body as UpdateUserRequest;

  if (id != req.params.userId) {
    res.sendStatus(400);
    return;
  }

  const affectedUser = await UserRepository.findById(id);

  if (username !== affectedUser.username && (await UserRepository.existsByUsername(username))) {
    res.status(400).send({ message: 'Username is already in use' });
    return;
  }

  if (email !== affectedUser.email && (await UserRepository.existsByEmail(email))) {
    res.status(400).send({ message: 'Email is already in use' });
    return;
  }

  const affectedRows = await UserRepository.updateUser(id, username, email);

  if (affectedRows == 0) {
    res.sendStatus(400);
    return;
  }

  res.sendStatus(204);
});
