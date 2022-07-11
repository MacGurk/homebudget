import User from './models/User';
import { AppEnv } from '../types';
import { Sequelize } from 'sequelize';
import config from '../config';
import Transaction from './models/Transaction';

const models = [User, Transaction];

const db = (env: AppEnv): Sequelize => {
  const sequelize = new Sequelize(config[env].db);

  models.forEach((model) => {
    model._init(sequelize);
  });

  User.hasMany(Transaction);
  Transaction.belongsTo(User, { as: 'user' });

  return sequelize;
};

export default db;
