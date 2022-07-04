import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { CreateUser, User } from '../entities/User.entity';
import { CreateUserDto, UserDto } from '../dto/User.dto';
import { Transaction } from '../entities/Transaction.entity';
import { TransactionDto } from '../dto/Transaction.dto';

export const mapper = createMapper({
  strategyInitializer: pojos(),
});

export const createMapping = () => {
  createMap<Transaction, TransactionDto>(
    mapper,
    'Transaction',
    'TransactionDto',
  );
  createMap<TransactionDto, Transaction>(
    mapper,
    'TransactionDto',
    'Transaction',
  );
  createMap<CreateUser, CreateUserDto>(
    mapper,
    'CreateUser',
    'CreateUserDto',
  );
  createMap<UserDto, User>(
    mapper,
    'UserDto',
    'User',
  );
};

function createUserMetadata() {
  PojosMetadataMap.create<User>('User', {
    id: String,
    username: String,
    email: String,
  });

  PojosMetadataMap.create<UserDto>('UserDto', {
    id: String,
    username: String,
    email: String,
  });

  PojosMetadataMap.create<CreateUser>('CreateUser', {
    username: String,
    email: String,
    password: String,
  });

  PojosMetadataMap.create<CreateUserDto>('CreateUserDto', {
    username: String,
    email: String,
    password: String,
  });
}

function createTransactionMetadata() {
  PojosMetadataMap.create<Transaction>('Transaction', {
    id: String,
    date: Date,
    description: String,
    price: Number,
    settled: Boolean,
    user: 'User',
  });

  PojosMetadataMap.create<TransactionDto>('TransactionDto', {
    id: String,
    date: Date,
    description: String,
    price: Number,
    settled: Boolean,
    user: 'UserDto',
  });
}

export function initialiseMapper() {
  createUserMetadata();
  createTransactionMetadata();
  createMapping();
}
