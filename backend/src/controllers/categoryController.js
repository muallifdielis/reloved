const Category = require('../models/categoryModel');

const categoryController = {};

categoryController.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      message: "Kategori berhasil diambil",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil kategori",
      error: error.message,
    });
  }
};

categoryController.addCategory = async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Kategori harus diisi",
    });
  }

  const categoryLower = category.toLowerCase();

  const existingCategory = await Category.findOne({ name: categoryLower });
  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Kategori sudah ada",
    });
  }

  if (!["pria", "wanita"].includes(categoryLower)) {
    return res.status(400).json({
      success: false,
      message: "Kategori hanya boleh 'Pria' atau 'Wanita'",
    });
  }

  try {
    const newCategory = await Category.create({ name: categoryLower });
    res.status(201).json({
      success: true,
      message: "Kategori berhasil ditambahkan",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan kategori",
      error: error.message,
    });
  }
};

module.exports = categoryController;