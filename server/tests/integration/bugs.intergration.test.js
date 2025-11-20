const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Bug = require('../../src/models/bug');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Bug.deleteMany({});
});

describe('Bugs API', () => {
  test('POST /api/bugs creates a bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test bug', description: 'desc', severity: 'low' })
      .expect(201);
    expect(res.body.title).toBe('Test bug');
    const count = await Bug.countDocuments();
    expect(count).toBe(1);
  });

  test('GET /api/bugs returns list', async () => {
    await Bug.create({ title: 'a', description: 'd' });
    const res = await request(app).get('/api/bugs').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  test('PUT /api/bugs/:id updates', async () => {
    const bug = await Bug.create({ title: 'to update' });
    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ title: 'updated', severity: 'high' })
      .expect(200);
    expect(res.body.title).toBe('updated');
  });

  test('DELETE /api/bugs/:id deletes', async () => {
    const bug = await Bug.create({ title: 'to delete' });
    await request(app).delete(`/api/bugs/${bug._id}`).expect(200);
    const found = await Bug.findById(bug._id);
    expect(found).toBeNull();
  });
});
