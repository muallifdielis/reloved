const Category = require('../models/Categories');

const categoryController = {};

//Mengambil semua kategori dari databse
categoryController.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('Products');
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

// Menambahkan kategori baru
categoryController.addCategory = async (req, res) => {
  const { name, description } = req.body;

  // Validasi input
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Nama dan deskripsi kategori harus diisi",
    });
  }

  const nameLower = name.toLowerCase();

  // Cek apakah kategori sudah ada
  const existingCategory = await Category.findOne({ name: nameLower });
  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Kategori sudah ada",
    });
  }

  // Validasi kategori
  if (!["pria", "wanita"].includes(nameLower)) {
    return res.status(400).json({
      success: false,
      message: "Kategori hanya boleh 'Pria' atau 'Wanita'",
    });
  }

  try {
    const newCategory = await Category.create({ name: nameLower, description });
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