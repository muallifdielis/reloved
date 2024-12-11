const Cart = require("../models/Cart");
const Product = require("../models/Products");
const User = require("../models/Users");
const cloudinary = require("cloudinary").v2;

const productsController = {};

productsController.createProducts = async (req, res) => {
  try {
    const { name, description, price, category, condition, size } = req.body;

    if (!name || !description || !price || !category || !condition || !size) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada file gambar yang diunggah",
      });
    }

    const images = req.files.map((file) => file.path);

    const product = new Product({
      name,
      description,
      price,
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

    const activeProducts = products.filter(
      (product) => product.isActive === true
    );

    res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: activeProducts,
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
    const { name, description, price, category, condition, size } = req.body;
    const deletedImages = req.body.deletedImages
      ? [].concat(req.body.deletedImages)
      : [];

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    if (deletedImages.length > 0) {
      for (const imageUrl of deletedImages) {
        const imageId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`reloved/${imageId}`);
      }

      // Hapus gambar produk di database
      product.images = product.images.filter(
        (image) => !deletedImages.includes(image)
      );
    }

    // Menambahkan gambar baru jika ada
    const newImages = req.files.map((file) => file.path);
    if (newImages.length > 0) {
      product.images.push(...newImages);
    }

    // Update field produk
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.condition = condition || product.condition;
    product.size = size || product.size;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui",
      data: updatedProduct,
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
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
        data: product,
      });
    }

    product.isActive = false;
    await product.save();

    // Menghapus produk dari likedProducts pengguna
    await User.updateMany(
      { likedProducts: id },
      { $pull: { likedProducts: id } }
    );

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

    const products = await Product.find({ seller: sellerId })
      .populate("seller", "name username image")
      .sort({ createdAt: -1 });

    const activeProducts = products.filter(
      (product) => product.isActive === true
    );

    res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: activeProducts,
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

    const activeProducts = products.filter(
      (product) => product.isActive === true
    );

    return res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: activeProducts,
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
      return res
        .status(404)
        .json({ success: false, message: "Pengguna tidak ditemukan" });
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
        success: true,
        message: "Produk batal disukai",
        data: {
          likes: product.likes,
          likedProducts: user.likedProducts,
        },
      });
    } else {
      // Like
      product.likes.push(userId);
      user.likedProducts.push(id);
      await product.save();
      await user.save();
      res.status(200).json({
        success: true,
        message: "Produk disukai",
        data: {
          likes: product.likes,
          likedProducts: user.likedProducts,
        },
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

    const likedProducts = await Product.find({
      _id: { $in: user.likedProducts },
    })
      .populate("seller", "name username image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Produk berhasil diambil",
      data: likedProducts,
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
