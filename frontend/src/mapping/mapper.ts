import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { CreateUser, UpdatePassword, User } from '../entities/User.entity';
import { CreateUserDto, UpdatePasswordDto, UserDto } from '../dto/User.dto';
import { Transaction } from '../entities/Transaction.entity';
import { TransactionDto } from '../dto/Transaction.dto';
import { Settlement } from '../entities/Settlement.entity';
import { SettlementDto } from '../dto/Settlement.dto';

export const mapper = createMapper({
  strategyInitializer: pojos(),
});

export const createMapping = () => {
  createMap<SettlementDto, Settlement>(mapper, 'SettlementDto', 'Settlement');
  createMap<Transaction, TransactionDto>(mapper, 'Transaction', 'TransactionDto');
  createMap<TransactionDto, Transaction>(mapper, 'TransactionDto', 'Transaction');
  createMap<CreateUser, CreateUserDto>(mapper, 'CreateUser', 'CreateUserDto');
  createMap<UserDto, User>(mapper, 'UserDto', 'User');
  createMap<User, UserDto>(mapper, 'User', 'UserDto');
  createMap<UpdatePassword, UpdatePasswordDto>(mapper, 'UpdatePassword', 'UpdatePasswordDto');
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

  PojosMetadataMap.create<UpdatePassword>('UpdatePassword', {
    id: String,
    password: String,
  });

  PojosMetadataMap.create<UpdatePasswordDto>('UpdatePassword', {
    id: String,
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

function createSettlementMetadata() {
  PojosMetadataMap.create<Settlement>('Settlement', {
    user: 'User',
    transactions: ['Transaction'],
    settleDifference: Number,
  });

  PojosMetadataMap.create<SettlementDto>('SettlementDto', {
    user: 'UserDto',
    transactions: ['TransactionDto'],
    settleDifference: Number,
  });
}

export function initialiseMapper() {
  createUserMetadata();
  createTransactionMetadata();
  createSettlementMetadata();
  createMapping();
}
