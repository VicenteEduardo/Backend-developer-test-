import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';

describe('Auth flow', () => {
  let mongoServer: MongoMemoryServer;
  let refreshToken: string;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    mongoose.set('bufferCommands', false); // Desativa buffer para evitar timeout
    await mongoose.connect(uri);
    await mongoose.connection.asPromise(); // Garante a conexão
  }, 30000); // Timeout aumentado para 30s

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('deve registrar e logar com sucesso', async () => {
    await request(app).post('/auth/register').send({
      name: 'Vicente',
      email: 'vicente@mail.com',
      password: '12345678',
    });

    const loginRes = await request(app).post('/auth/login').send({
      email: 'vicente@mail.com',
      password: '12345678',
    });

    expect(loginRes.body.accessToken).toBeDefined();
    refreshToken = loginRes.body.refreshToken;
  }, 15000); // timeout do teste
});
