const request = require('supertest');
const app = require('../../server');
const Item = require('../../src/models/itemModel');
const User = require('../../src/models/userModel');
const mongoose = require('mongoose');

let user;
let token;

describe('Item API Endpoints', () => {

  beforeEach(async () => {
    // Create a test user and get a token
    const res = await request(app)
      .post('/api/users')
      .send({
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: 'password',
        phoneNumber: '777-888-9999',
        role: 'Inventory Manager',
      });

    user = res.body;
    token = res.body.token;
  });

  afterEach(async () => {
    // Clean up: Remove the user and the created item after each test
    await User.deleteOne({ email: 'admin@example.com' });
    await Item.deleteMany({ name: 'Test Item' });
  });

  it('should create a new item (admin)', async () => {
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Item',
        category: 'Device',
        serialNumber: 'TEST1234',
        condition: 'Good',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Test Item');
  });

  it('should get all items', async () => {
    // First, create an item to ensure there's something to get
    await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Item',
        category: 'Device',
        serialNumber: 'TEST5678',
        condition: 'Good',
      });

    const res = await request(app)
      .get('/api/items')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});