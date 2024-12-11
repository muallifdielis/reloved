const Order = require("../models/Orders");
const Product = require("../models/Products");

const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
    const { shippingAddress, order_items, shippingMethod } = req.body;

    let shipping_fee = 0;
    switch (shippingMethod) {
      case "Reguler":
        shipping_fee = 15000;
        break;
      case "Hemat":
        shipping_fee = 0;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Metode pengiriman tidak valid",
        });
    }

    let total_price = 0;
    for (let item of order_items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Produk dengan ID ${item.product} tidak ditemukan`,
        });
      }
      total_price += product.price;
    }

    total_price += shipping_fee;

    const order = new Order({
      user: req.user.id,
      shippingAddress,
      order_items,
      shippingMethod,
      total_price,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat pesanan",
      error: error.message,
    });
  }
};

orderController.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("order_items.product", "name price images")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data pesanan",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil pesanan",
      error: error.message,
    });
  }
};

orderController.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate({
        path: "order_items.product",
        select: "name price size images",
        populate: { path: "seller", select: "name" },
      })
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan detail pesanan",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil detail pesanan",
      error: error.message,
    });
  }
};

orderController.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Status pesanan berhasil diperbarui",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui status pesanan",
      error: error.message,
    });
  }
};

orderController.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pesanan berhasil dibatalkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membatalkan pesanan",
      error: error.message,
    });
  }
};

module.exports = orderController;