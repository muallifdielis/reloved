require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080,
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  clientUrl: process.env.CLIENT_URL,
  senderEmail: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,


    // Konfigurasi Midtrans
    midtransServerKey: process.env.MIDTRANS_SERVER_KEY,
    midtransClientKey: process.env.MIDTRANS_CLIENT_KEY,
};
