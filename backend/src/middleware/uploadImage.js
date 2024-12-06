const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../upload");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadMiddleware = upload.array("images", 10);

module.exports = uploadMiddleware;

const Cart = require("../models/Cart");
const Product = require("../models/Products");

const cartController = {};

// Tambahkan item ke keranjang
cartController.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validasi produk dan jumlah
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });
    }

    // Cari keranjang user
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // Buat keranjang baru jika belum ada
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Cek apakah produk sudah ada di keranjang
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Perbarui jumlah jika produk sudah ada
      cart.items[itemIndex].quantity += quantity;
      // Hitung ulang total untuk item ini
      cart.items[itemIndex].total =
        cart.items[itemIndex].quantity * product.price;
    } else {
      // Tambahkan produk baru ke keranjang
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        total: quantity * product.price,
      });
    }

    // Hitung ulang total price keranjang
    cart.totalPrice = cart.items.reduce((total, item) => total + item.total, 0);

    // Simpan perubahan
    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Product added to cart", data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: error.message,
    });
  }
};

// Ambil keranjang user
cartController.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
      "name price"
    );

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

// Perbarui jumlah item di keranjang
cartController.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    if (quantity < 1) {
      // Hapus item jika jumlah diatur ke 0
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
      // Hitung ulang total untuk item ini
      cart.items[itemIndex].total = quantity * cart.items[itemIndex].price;
    }

    // Hitung ulang total price keranjang
    cart.totalPrice = cart.items.reduce((total, item) => total + item.total, 0);

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Cart updated", data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
};

// Hapus item dari keranjang
cartController.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    // Hapus item dari keranjang
    cart.items.splice(itemIndex, 1);

    // Hitung ulang total price keranjang
    cart.totalPrice = cart.items.reduce((total, item) => total + item.total, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing product from cart",
      error: error.message,
    });
  }
};

// Kosongkan keranjang
cartController.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    // Kosongkan items dan reset totalPrice
    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Cart cleared", data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    });
  }
};

module.exports = cartController;
