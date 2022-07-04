import dotenv from 'dotenv';
import { Options } from 'sequelize';
import { AppEnv } from './types';

dotenv.config();

interface Config {
  db: Options;
  envVars: string[];
}

const devEnvVars = ['JWTSECRET'];
const prodEnvVars = ['JWTSECRET', 'USERNAME', 'PASSWORD', 'HOST', 'DIALECT'];

export const isTest = process.env.NODE_ENV === 'test';

export default {
  DEV: {
    db: {
      dialect: 'sqlite',
      storage: 'dev-db.sqlite',
    },
    envVars: devEnvVars,
  },
  PROD: {
    db: {
      database: process.env.DATABASE,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      dialect: process.env.DIALECT,
    },
    envVars: prodEnvVars,
  },
  TEST: {
    db: {
      dialect: 'sqlite',
      storage: 'test-db.sqlite',
    },
  },
} as { [key in AppEnv]: Config };
