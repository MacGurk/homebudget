import db from '../../src/db/database';
import supertest from 'supertest';
import app from '../../src/app';
import UserRepository from '../../src/db/repository/UserRepository';
import { TransactionResponse } from '../../src/api/transaction';

describe('/api/transaction', () => {
  const thisDb = db('TEST');
  const user1 = {
    username: 'user1',
    email: 'user1@mail.com',
    password: 'password1',
  };
  const user2 = {
    username: 'user2',
    email: 'user2@mail.com',
    password: 'password2',
  };

  let user1Id: string;
  let user2Id: string;

  beforeAll(async () => {
    await thisDb.sync({ force: true });
    user1Id = (await UserRepository.create(user1.username, user1.email, user1.password)).id;
    user2Id = (await UserRepository.create(user2.username, user2.email, user2.password)).id;
  });

  it('should be able to create a transaction', async () => {
    const transactionDate = new Date();
    const transactionDescription = 'New Transaction';
    const transactionPrice = 1000;
    const response = await supertest(app)
      .post('/api/transaction')
      .send({ date: transactionDate, description: transactionDescription, price: transactionPrice, userId: user1Id })
      .set('Content-Type', 'application/json')
      .expect(200);

    const res = response.body as TransactionResponse;

    expect(res.id).toBeDefined();
    expect(res.date).toBe(transactionDate.toISOString());
    expect(res.description).toBe(transactionDescription);
    expect(res.price).toBe(transactionPrice);
    expect(res.user.username).toBe(user1.username);
    expect(res.user.id).toBe(user1Id);
    expect(res.user.email).toBe(user1.email);
  });

  afterAll(async () => {
    await thisDb.close();
  });
});
