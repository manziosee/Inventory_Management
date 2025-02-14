const request = require('supertest');
const app = require('../../server'); // Corrected path
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

    const itemRes = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Borrow Test Item',
        category: 'Device',
        serialNumber: 'BORROW123',
        condition: 'Good',
        location: 'Main Office',
        purchaseDate: '2024-01-15',
        purchasePrice: 1299.99,
        warranty: '2025-01-15',
        maintenanceInterval: '1year',
      });

    item = itemRes.body;

    const personRes = await request(app)
      .post('/api/people')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fullName: 'Borrower Person',
        nationalId: '123456789',
        email: 'borrower@example.com',
        phoneNumber: '555-555-5555',
        residence: 'Test Address',
      });

    person = personRes.body;
  });

  afterEach(async () => {
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
        expectedReturnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        initialCondition: 'Good',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all borrowings with pagination', async () => {
    await request(app)
      .post('/api/borrowings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId: item._id,
        borrowerId: person._id,
        borrowDate: new Date(),
        expectedReturnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        initialCondition: 'Good',
      });

    const res = await request(app)
      .get('/api/borrowings?pageSize=1&pageNumber=1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.borrowings.length).toEqual(1);
  });
});
