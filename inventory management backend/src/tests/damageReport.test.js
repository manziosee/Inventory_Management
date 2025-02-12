const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const DamageReport = require('../../src/models/damageReportModel');
const Item = require('../../src/models/itemModel');
const User = require('../../src/models/userModel');

let user;
let token;
let item;

describe('Damage Report API Endpoints', () => {
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
        name: 'Damage Test Item',
        category: 'Device',
        serialNumber: 'DAMAGE123',
        condition: 'Good',
      });

    item = itemRes.body;
  });

  afterEach(async () => {
    // Clean up: Remove all created data
    await User.deleteMany({ email: 'admin@example.com' });
    await Item.deleteMany({ name: 'Damage Test Item' });
    await DamageReport.deleteMany({});
  });

  it('should create a new damage report', async () => {
    const res = await request(app)
      .post('/api/damage-reports')
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId: item._id,
        damageReason: 'Screen cracked',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
  it('should get all damageReports with pagination', async () => {
    // First, create an item to ensure there's something to get
    await request(app)
      .post('/api/damage-reports')
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId: item._id,
        damageReason: 'Screen cracked',
      });
    const res = await request(app)
      .get(`/api/damage-reports?pageSize=1&pageNumber=1`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.damageReports.length).toEqual(1);
  });

  // Add more test cases for other functionalities (getting, updating damage reports)
});