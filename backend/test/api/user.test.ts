import db from '../../src/db/database';
import supertest from 'supertest';
import app from '../../src/app';
import { UserResponse } from '../../src/api/user';

describe('/api/user', () => {
  const thisDb = db('TEST');

  beforeAll(async () => {
    await thisDb.sync({ force: true });
  });

  it('should be able to create a user', async () => {
    const userName = 'user1';
    const userEmail = 'user1@mail.com';
    const userPassword = 'password1';
    const response = await supertest(app)
      .post('/api/user')
      .send({ username: userName, email: userEmail, password: userPassword })
      .set('Content-Type', 'application/json')
      .expect(200);

    const res = response.body as UserResponse;
    expect(res.username).toBe(userName);
    expect(res.email).toBe(userEmail);
  });

  afterAll(async () => {
    await thisDb.close();
  });
});
