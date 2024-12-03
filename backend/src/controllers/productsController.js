const Product = require("../models/Products");

const productsController = {};

productsController.createProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      condition,
      // image_urls, // pake multer
      size,
      seller = req.user.id,
    } = req.body;

    if (image_urls && !Array.isArray(image_urls)) {
      return res.status(400).json({
        success: false,
        message: "image_urls must be an array",
      });
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      condition,
      // image_urls,
      size,
      seller,
    });

    const saveProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: saveProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating product",
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
    if (sort === "cheapest") {
      sortOptions.price = 1;
    } else if (sort === "expensive") {
      sortOptions.price = -1;
    } else if (sort === "newest") {
      sortOptions.createdAt = -1;
    } else if (sort === "oldest") {
      sortOptions.createdAt = 1;
    }

    const products = await Product.find(filter)
      .sort(sortOptions)
      .populate("seller", "name username");

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

productsController.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id).populate(
      "seller",
      "name username"
    );
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

productsController.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      stock,
      category,
      condition,
      // image_urls,
      size,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description,
        price: price,
        stock: stock,
        category: category,
        condition: condition,
        // image_urls: image_urls,
        size: size,
      },
      { new: true }
    ).populate("seller", "name username");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found", data: product });
    }

    res.status(200).json({
      success: true,
      message: "Product update successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

productsController.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found", data: product });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to deleted product",
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

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this seller",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

module.exports = productsController;
