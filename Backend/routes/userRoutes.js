const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../utils/userModal");
const verifyToken = require("../middleware/auth");

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, name, password: hashpassword });
    await newUser.save();

    res.status(200).json({ message: "Sign Up Successful" });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
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

// Example made to verifyToken
// router.get("/profile", verifyToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.error("Error fetching user profile:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

module.exports = router;
