const softDeleteFilter = (req, res, next) => {
  req.filter = { isDeleted: { $ne: true } };
  next();
};

module.exports = { softDeleteFilter };
