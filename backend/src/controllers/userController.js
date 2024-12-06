const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const userController = {
  async createUser(req, res) {
    try {
      const { name, username, email, password, phone, role, address, bio } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) return res.status(400).json({ message: "Username already exists" });

      const newUser = new User({
        name,
        username,
        email,
        password,
        phone,
        role,
        address,
        bio,
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  },

  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1h", 
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  },

  async getUserProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  },
};

module.exports = userController;
