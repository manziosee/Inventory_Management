const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Borrowing = require('../../src/models/borrowingModel');
const Item = require('../../src/models/itemModel');
const User = require('../../src/models/userModel');
const Person = require('../../src/models/personModel');

let user;
let token;
let item;
let person;

describe('Borrowing API Endpoints', () => {
  beforeEach(async () => {
    // 1. Create an admin user
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

    // 2. Create an item
    const itemRes = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Borrow Test Item',
        category: 'Device',
        serialNumber: 'BORROW123',
        condition: 'Good',
      });

    item = itemRes.body;

    // 3. Create a person (borrower)
    const personRes = await request(app)
      .post('/api/users')
      .send({
        fullName: 'Borrower Person',
        email: 'borrower@example.com',
        password: 'password',
        phoneNumber: '555-555-5555',
        role: 'Program Manager',
      });

    // 4. Save Person
    person = await Person.create({
      fullName: 'Test Person',
      nationalId: '123456789',
      email: 'test@example.com',
      phoneNumber: '555-123-4567',
      residence: 'Test Address',
    });
  });

  afterEach(async () => {
    // Clean up: Remove all created data
    await User.deleteMany({ email: ['admin@example.com', 'borrower@example.com'] });
    await Item.deleteMany({ name: 'Borrow Test Item' });
    await Borrowing.deleteMany({});
    await Person.deleteMany({});
  });

  it('should create a new borrowing record', async () => {
    const res = await request(app)
      .post('/api/borrowings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId: item._id,
        borrowerId: person._id,
        borrowDate: new Date(),
        expectedReturnDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
        initialCondition: 'Good',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
});