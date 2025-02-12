const request = require('supertest');
const app = require('../../server');
const User = require('../../src/models/userModel');
const mongoose = require('mongoose');

describe('User API Endpoints', () => {
  let adminUser;
  let token;
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

  adminUser = res.body;
  token = res.body.token;
  })
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password',
        phoneNumber: '123-456-7890',
        role: 'Program Manager',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');

    // Clean up: Remove the user after the test
    await User.deleteOne({ email: 'test@example.com' });
  });

  it('should login an existing user', async () => {
    // First, register a user
    await request(app)
      .post('/api/users')
      .send({
        fullName: 'Login User',
        email: 'login@example.com',
        password: 'password',
        phoneNumber: '111-222-3333',
        role: 'Inventory Manager',
      });

    // Now, try to log them in
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'login@example.com',
        password: 'password',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');

        // Clean up: Remove the user after the test
    await User.deleteOne({ email: 'login@example.com' });
  });

  it('should get user profile with a valid token', async () => {
    // Register a user
    const registerRes = await request(app)
      .post('/api/users')
      .send({
        fullName: 'Profile User',
        email: 'profile@example.com',
        password: 'password',
        phoneNumber: '444-555-6666',
        role: 'Program Manager',
      });

    const token = registerRes.body.token;

    // Get the user profile
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`); // Set the Authorization header

    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toEqual('profile@example.com');
            // Clean up: Remove the user after the test
    await User.deleteOne({ email: 'profile@example.com' });
  });
});