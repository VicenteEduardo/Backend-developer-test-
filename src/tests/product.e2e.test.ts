import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import { ProductModel } from '../../src/infrastructure/database/models/ProductModel';

describe('E2E - Product API', () => {
  let accessToken: string;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/product-ddd-test');

    // Cria e loga o usuário
    await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@mail.com',
      password: '12345678',
    });

    const login = await request(app).post('/auth/login').send({
      email: 'test@mail.com',
      password: '12345678',
    });

    accessToken = login.body.accessToken;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await ProductModel.deleteMany();
  });

  it('deve criar um produto com sucesso', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Produto Teste',
        price: 99.9,
        description: 'Descrição do produto teste'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Produto Teste');
  });

  it('deve retornar erro de validação ao criar produto inválido', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: '',
        price: 'abc',
        description: ''
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('message');
  });

  it('deve listar produtos', async () => {
    await ProductModel.create({ name: 'Produto 1', price: 10, description: 'teste' });

    const res = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
