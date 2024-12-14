const Product = require("../models/Products");
const Order = require("../models/Orders");
const Withdrawal = require("../models/Withdrawal");
const UserBank = require("../models/UserBank");

const withdrawalController = {};

// Mendapatkan total pendapatan seller
withdrawalController.getSellerEarnings = async (req, res) => {
    const { sellerId } = req.params;

    try {
        const products = await Product.find({
            seller: sellerId,
            isAvailable: false,
        }).select("price _id name");

        const totalEarnings = products.reduce((total, product) => {
            return total + product.price;
        }, 0);

        const productDetails = products.map(product => ({
            productId: product._id,
            name: product.name,
            price: product.price,
        }));

        res.status(200).json({
            message: "Total pendapatan seller berhasil dihitung.",
            data: {
                totalEarnings,
                productDetails,
            },
        });
    } catch (error) {
        console.error("Error saat menghitung pendapatan seller:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
};

// Membuat withdrawal
withdrawalController.createWithdrawal = async (req, res) => {
    const sellerId = req.user.id;
    const { userBank, amount, description } = req.body;

    if (!userBank || !amount || !description) {
        return res.status(400).json({
            message: "Data userBank, amount, dan description wajib diisi.",
        });
    }

    try {
        const products = await Product.find({
            seller: sellerId,
            isAvailable: false,
        });

        const totalEarnings = products.reduce((total, product) => total + product.price, 0);

        // Validasi jumlah penarikan
        const MIN_WITHDRAWAL_AMOUNT = 10000; // Batas minimal penarikan
        if (amount < MIN_WITHDRAWAL_AMOUNT) {
            return res.status(400).json({
                message: `Jumlah minimal penarikan adalah ${MIN_WITHDRAWAL_AMOUNT}.`,
            });
        }

        if (amount > totalEarnings) {
            return res.status(400).json({
                message: "Jumlah penarikan melebihi total pendapatan Anda.",
            });
        }

        const bank = await UserBank.findById(userBank);
        if (!bank) {
            return res.status(400).json({
                message: "User bank tidak ditemukan.",
            });
        }

        // Hitung dana tersisa setelah penarikan
        const remainingEarnings = totalEarnings - amount;

        // Buat data withdrawal
        const withdrawal = new Withdrawal({
            seller: sellerId,
            userBank,
            amount,
            totalEarnings,
            remainingEarnings,
            description,
            withdrawal_id: `WITHDRAWAL-${Date.now()}`,
        });

        await withdrawal.save();

        const populatedWithdrawal = await Withdrawal.findById(withdrawal._id).populate({
            path: "userBank",
            select: "namebank norek",
        });

        res.status(200).json({
            message: "Withdrawal berhasil diproses.",
            withdrawal: populatedWithdrawal,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat memproses withdrawal:", error);
        res.status(500).json({
            message: "Terjadi kesalahan pada server.",
        });
    }
};

// Mendapatkan semua withdrawal milik seller
withdrawalController.getWithdrawals = async (req, res) => {
    const sellerId = req.user.id;

    try {
        const withdrawals = await Withdrawal.find({ seller: sellerId }).populate({
            path: "userBank",
            select: "namebank norek",
        });

        res.status(200).json({
            message: "Daftar withdrawal berhasil diambil.",
            withdrawals,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data withdrawal:", error);
        res.status(500).json({
            message: "Terjadi kesalahan pada server.",
        });
    }
};

// Mendapatkan satu withdrawal berdasarkan ID
withdrawalController.getWithdrawalById = async (req, res) => {
    const { withdrawalId } = req.params;

    try {
        const withdrawal = await Withdrawal.findById(withdrawalId).populate({
            path: "userBank",
            select: "namebank norek",
        });

        if (!withdrawal) {
            return res.status(404).json({ message: "Withdrawal tidak ditemukan." });
        }

        res.status(200).json({
            message: "Withdrawal berhasil diambil.",
            withdrawal,
        });
    } catch (error) {
        console.error("Error saat mendapatkan withdrawal:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
};

module.exports = withdrawalController;
