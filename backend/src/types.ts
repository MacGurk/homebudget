import User from './db/models/User';

export type AppEnv = 'PROD' | 'DEV' | 'TEST';

declare module 'express' {
  export interface Request {
    user: User;
  }
}
