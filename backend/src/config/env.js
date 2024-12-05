require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080,
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017",
  jwtSecret: process.env.JWT_SECRET, 
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d" 
};
