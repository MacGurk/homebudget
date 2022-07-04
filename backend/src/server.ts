import app from './app';
import config, { isTest } from './config';
import { AppEnv } from './types';
import db from './db/database';

const ENV = (process.argv[2] === 'DEV' ? 'DEV' : isTest ? 'TEST' : 'PROD') as AppEnv;
const PORT = process.env.port || 3001;

db(ENV)
  .sync()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`ready on port ${PORT} with env ${ENV}`);
    });
  });
