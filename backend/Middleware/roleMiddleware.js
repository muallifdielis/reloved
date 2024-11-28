//Memastikan pengguna memiliki peran yang sesuai untuk mengakses endpoint tertentu.

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses resource ini.' });
        }
        next();
    };
};

module.exports = roleMiddleware;
