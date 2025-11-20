const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper to generate tokens
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "1h" }
  );
};

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user),
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user),
    });
  } catch (err) {
    next(err);
  }
};
