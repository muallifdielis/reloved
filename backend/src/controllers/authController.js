const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

const generateToken = (id) => {
  return jwt.sign({ id }, 'ysPo2jtgCZwwr4Yw0BoSPqw4' , { expiresIn: jwtExpiresIn });
};



/**
 * Registrasi pengguna baru
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, no_hp, role } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password,
      no_hp,
      role,
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Login pengguna
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("user",user)
    if (!user) {
      return res.status(404).json({ success: false, message: 'Email tidak ditemukan' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: 'Password salah' });
    }

    const token = generateToken({ id: user._id, email: user.email }, '1d' );
    console.log(token)

    

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};
