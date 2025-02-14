const request = require('supertest');
const app = require('../../server'); // Corrected path
const mongoose = require('mongoose');
const DamageReport = require('../../src/models/damageReportModel');
const Item = require('../../src/models/itemModel');
const User = require('../../src/models/userModel');

let user;
let token;
let item;

describe('Damage Report API Endpoints', () => {
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
        name: 'Damage Test Item',
        category: 'Device',
        serialNumber: 'DAMAGE123',
        condition: 'Good',
        location: 'Main Office',
        purchaseDate: '2024-01-15',
        purchasePrice: 1299.99,
        warranty: '2025-01-15',
        maintenanceInterval: '1year',
      });

    item = itemRes.body;
  });

  afterEach(async () => {
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

  it('should get all damage reports with pagination', async () => {
    await request(app)
      .post('/api/damage-reports')
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId: item._id,
        damageReason: 'Screen cracked',
      });

    const res = await request(app)
      .get('/api/damage-reports?pageSize=1&pageNumber=1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.damageReports.length).toEqual(1);
  });
});
