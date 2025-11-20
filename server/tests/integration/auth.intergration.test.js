const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../src/app");
const User = require("../../src/models/User");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test("POST /api/auth/register should create a user", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ username: "test", email: "test@test.com", password: "123456" });

  expect(res.status).toBe(201);
  expect(res.body.token).toBeDefined();
});

test("POST /api/auth/login should authenticate user", async () => {
  await User.create({ username: "Lydia", email: "login@test.com", password: "123456" });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "login@test.com", password: "123456" });

  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});
