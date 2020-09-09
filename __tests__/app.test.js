const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Llama = require('../lib/models/llama');

describe('PostgreSQL-Models routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('create a new Llama via POST', async() => {
    const response = await request(app)
      .post('/api/v1/llamas')
      .send({ name: 'sammy', age: 10, weight: '300 lbs' });
    
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'sammy',
      age: 10,
      weight: '300 lbs'
    });
  });



});
