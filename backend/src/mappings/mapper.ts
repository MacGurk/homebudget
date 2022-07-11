import { createMap, createMapper, mapFrom } from '@automapper/core';
import { sequelize } from '@automapper/sequelize';
import { UserDto } from '../dto/User.dto';
import User from '../db/models/User';
import Transaction from '../db/models/Transaction';
import { TransactionDto } from '../dto/Transaction.dto';

export const mapper = createMapper({
  strategyInitializer: sequelize(),
});

export const createMapping = () => {
  createMap(mapper, Transaction, TransactionDto);
  createMap(mapper, User, UserDto);
};
