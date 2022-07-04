import { NextFunction, Request, Response } from 'express';
import JwtTokenProvider from '../service/JwtTokenProvider';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) res.sendStatus(401);

  const validToken = await JwtTokenProvider.verifyToken(token);
  if (validToken) {
    const user = await JwtTokenProvider.decodeUser(token);
    if (user) {
      req.user = user;
      next();
      return;
    }
  }
  res.sendStatus(403);
};
