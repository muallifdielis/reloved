const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verifikasi token dan decode payloadnya
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan hanya ID ke req.user
    req.user = { id: decoded.id };

    // Lanjutkan ke route selanjutnya
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
