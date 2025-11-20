const { register, login } = require("../../src/controllers/authController");

test("register should be a function", () => {
  expect(typeof register).toBe("function");
});

test("login should be a function", () => {
  expect(typeof login).toBe("function");
});
