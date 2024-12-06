const Product = require("../models/Products");
const User = require("../models/Users");

const productsController = {};

productsController.createProducts = async (req, res) => {
  try {
    const { name, description, price, stock, category, condition, size } =
      req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada file gambar yang diunggah",
      });
    }

    const images = req.files.map((file) => `uploads/${file.filename}`);

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      condition,
      images,
      size,
      seller: req.user.id,
    });

    const saveProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Produk berhasil dibuat",
      data: saveProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Terjadi kesalahan saat membuat produk",
      error: error.message,
    });
  }
};

productsController.getAllProducts = async (req, res) => {
  try {
    const { category, sort } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
    }

    const sortOptions = {};
    if (sort === "price-asc") {
      sortOptions.price = 1;
    } else if (sort === "price-desc") {
      sortOptions.price = -1;
    } else if (sort === "newest") {
      sortOptions.createdAt = -1;
    } else if (sort === "oldest") {
      sortOptions.createdAt = 1;
    }

    const products = await Product.find(filter)
      .sort(sortOptions)
      .populate("seller", "name username image");

    res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil produk",
      error: error.message,
    });
  }
};

productsController.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id).populate(
      "seller",
      "name username image"
    );
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil produk",
      error: error.message,
    });
  }
};

productsController.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, condition, size } =
      req.body;
    const newImage = req.files
      ? req.files.map((file) => `uploads/${file.filename}`)
      : [];
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
          price,
          stock,
          category,
          condition,
          size,
        },
        $push: { images: { $each: newImage } },
      },
      { new: true }
    ).populate("seller", "name username image");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
        data: product,
      });
    }

    res.status(200).json({
      success: true,
      message: "Produk berhasil diupdate",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Terjadi kesalahan saat mengupdate produk",
      error: error.message,
    });
  }
};

productsController.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
        data: product,
      });
    }

    res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus produk",
      error: error.message,
    });
  }
};

productsController.getProductBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const products = await Product.find({ seller: sellerId }).populate(
      "seller",
      "name username"
    );

    res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil produk",
      error: error.message,
    });
  }
};

productsController.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query tidak boleh kosong.",
      });
    }

    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    }).populate("seller", "name username image");

    return res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil produk",
      error: error.message,
    });
  }
};

productsController.likeUnlikeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }

    const userLikedProduct = product.likes.includes(userId);

    if (userLikedProduct) {
      // Unlike
      product.likes = product.likes.filter(
        (likeUserId) => likeUserId.toString() !== userId.toString()
      );
      user.likedProducts = user.likedProducts.filter(
        (likedProductId) => likedProductId.toString() !== id.toString()
      );
      await product.save();
      await user.save();
      res.status(200).json({
        message: "Produk batal disukai",
        likes: product.likes,
        likedProducts: user.likedProducts,
      });
    } else {
      // Like
      product.likes.push(userId);
      user.likedProducts.push(id);
      await product.save();
      await user.save();
      res.status(200).json({
        message: "Produk disukai",
        likes: product.likes,
        likedProducts: user.likedProducts,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menyukai produk",
      error: error.message,
    });
  }
};

productsController.getLikedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("likedProducts");
    res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: user.likedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil produk",
      error: error.message,
    });
  }
};

module.exports = productsController;
