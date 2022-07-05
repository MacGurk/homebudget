import {Request, Response, Router} from 'express';
import UserRepository from '../../db/repository/UserRepository';

interface UpdatePasswordRequest {
  id: string;
  password: string;
}

export default Router().put('/:userId/updatePassword', async (req: Request, res: Response) => {
  const { id, password }= req.body as UpdatePasswordRequest;

  if ( id != req.params.userId) {
    res.sendStatus(400);
  }

  await UserRepository.updatePassword(id, password);

  res.sendStatus(204);
});