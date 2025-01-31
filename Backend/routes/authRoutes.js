const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../utils/userModal");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

router.post('/register', async (req, res) => {
  try {
    const { email, name, password, adminSecret } = req.body;


    if (!email || !password || !name || !adminSecret) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Invalid admin secret code' });
    }


    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashPassword, isAdmin: true });
    await newUser.save();

    res.status(201).json({ message: 'Sign Up Successful' });
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// SIGN IN Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again" });
    }

    const token = generateToken(user);
    const { password: userPassword, ...userWithoutPassword } = user._doc;

    res.status(200).json({ ...userWithoutPassword, token });
  } catch (error) {
    console.error("Error in user sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
