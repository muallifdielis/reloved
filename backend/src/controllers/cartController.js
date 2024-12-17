const Cart = require("../models/Cart");
const Product = require("../models/Products");

const cartController = {};

cartController.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      return res
        .status(400)
        .json({ success: false, message: "Produk sudah ada di keranjang" });
    }

    cart.items.push({
      product: productId,
      price: product.price,
      total: product.price,
    });

    cart.totalPrice = cart.items.reduce((total, item) => total + item.total, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Produk berhasil ditambahkan ke keranjang",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan produk ke keranjang",
      error: error.message,
    });
  }
};

cartController.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      select: "name price images isActive isAvailable",
      populate: {
        path: "seller",
        select: "name isActive",
      },
    });

    const activeProducts = cart?.items?.filter((item) => {
      return (
        item.product &&
        item.product.isActive === true &&
        item.product.seller.isActive === false
      );
    });

    res.status(200).json({ success: true, data: activeProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil keranjang",
      error: error.message,
    });
  }
};

cartController.removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Keranjang tidak ditemukan" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === id
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan dalam keranjang",
      });
    }

    cart.items.splice(itemIndex, 1);

    cart.totalPrice = cart.items.reduce((total, item) => total + item.total, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus dari keranjang",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus produk dari keranjang",
      error: error.message,
    });
  }
};

cartController.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Keranjang tidak ditemukan" });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Keranjang berhasil dihapus",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus keranjang",
      error: error.message,
    });
  }
};

module.exports = cartController;
