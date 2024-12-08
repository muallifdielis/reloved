const { cloudName, cloudKey, cloudSecret } = require("../config/env");

const cloudinary = require("cloudinary").v2;

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret,
});

module.exports = cloudinary;
