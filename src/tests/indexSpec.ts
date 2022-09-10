import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test endpoint responses', () => {

  it('gets the Main api endpoint', async () => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
  });

  it('Create product endpoint', async () => {
    const response = await request.post('/api/products').send({id:1,name:"product",price:40,category:"cat1"});
    expect(response.status).toBe(200);
  });

  it('getAll products endpoint', async () => {
    const response = await request.get('/api/products');
    expect(response.status).toBe(200);
  });

  it('get product by id endpoint', async () => {
    const response = await request.get('/api/products?id=1');
    expect(response.status).toBe(200);
  });


  it('Create user endpoint', async () => {
    const response = await request.post('/api/users').send({id:1,firstname:"user",lastname:"test",password:"pass123"});
    expect(response.status).toBe(200);
  });

  it('OrderByUser id endpoint', async () => {
    const response = await request.get('/api/orders?user_id=1');
    expect(response.status).not.toBe(200)
  });

  it('getAll users endpoint', async () => {
    const response = await request.get('/api/users');
    expect(response.status).toBe(200);
  });

  it('get user by id endpoint', async () => {
    const response = await request.get('/api/users?id=1');
    expect(response.status).toBe(200);
  });





});