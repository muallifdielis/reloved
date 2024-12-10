const Category = require("../models/Categories");

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

categoryController.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }
    res.status(200).json({
      success: true,
      message: "Kategori berhasil diambil",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil kategori",
      error: error.message,
    });
  }
};

categoryController.createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Nama dan deskripsi kategori harus diisi",
    });
  }

  const existingCategory = await Category.findOne({ name: name });
  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Kategori sudah ada",
    });
  }

  try {
    const newCategory = await Category.create({ name, description });
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

categoryController.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }
    res.status(200).json({
      success: true,
      message: "Kategori berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus kategori",
      error: error.message,
    });
  }
};

categoryController.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Nama kategori harus diisi untuk memperbarui kategori",
    });
  }

  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Kategori berhasil diperbarui",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui kategori",
      error: error.message,
    });
  }
};

module.exports = categoryController;
