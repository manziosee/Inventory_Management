const request = require('supertest');
const app = require('../../server'); // Corrected path
const mongoose = require('mongoose');
const Person = require('../../src/models/personModel');
const User = require('../../src/models/userModel');

let user;
let token;

describe('Person API Endpoints', () => {
  beforeEach(async () => {
    const adminRes = await request(app)
      .post('/api/users')
      .send({
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: 'password',
        phoneNumber: '777-888-9999',
        role: 'Inventory Manager',
      });

    user = adminRes.body;
    token = adminRes.body.token;
  });

  afterEach(async () => {
    await User.deleteMany({ email: 'admin@example.com' });
    await Person.deleteMany({ fullName: 'Test Person' });
  });

  it('should create a new person', async () => {
    const res = await request(app)
      .post('/api/people')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fullName: 'Test Person',
        nationalId: '1234567890',
        email: 'test@example.com',
        phoneNumber: '555-123-4567',
        residence: '123 Test St',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.fullName).toEqual('Test Person');
  });

  it('should get all people with pagination', async () => {
    await request(app)
      .post('/api/people')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fullName: 'Test Person',
        nationalId: '1234567891',
        email: 'test1@example.com',
        phoneNumber: '555-123-4561',
        residence: '123 Test St',
      });

    const res = await request(app)
      .get('/api/people?pageSize=1&pageNumber=1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.people.length).toEqual(1);
  });
});
