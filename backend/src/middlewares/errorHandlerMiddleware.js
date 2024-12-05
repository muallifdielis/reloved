// Menangkap error di seluruh aplikasi.

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Terjadi kesalahan pada server.',
    });
};

module.exports = errorHandlerMiddleware;
