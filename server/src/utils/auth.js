const jwt = require("jsonwebtoken");

/**
 * Generate a JWT token for a user
 * @param {Object} user - Mongoose user object
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "1h" }
  );
};

module.exports = {
  generateToken,
};
