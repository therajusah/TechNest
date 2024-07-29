const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        if (decoded.isAdmin) {
            req.user = decoded;
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    });
};

module.exports = verifyAdmin;
