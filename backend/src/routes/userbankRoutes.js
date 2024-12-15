const express = require("express");
const userBankController = require("../controllers/userBankController");
const { verifyToken } = require("../middleware/verifyToken");

const userBankRoutes = express.Router();

userBankRoutes.post("/", verifyToken, userBankController.addUserBank);
userBankRoutes.get("/:userId", verifyToken, userBankController.getsUserBanks);
userBankRoutes.delete("/:userBankId", verifyToken, userBankController.deleteUserBank);
userBankRoutes.put("/:userBankId", verifyToken, userBankController.updateUserBank);

module.exports = userBankRoutes;
