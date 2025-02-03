const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "secret000"

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403).json({
                    message: "Invalid token"
                })
            }
            req.userId = user.userId;
            next();
        });
    } else {
        res.sendStatus(401).json({
            message: "Unauthorized: No token provided"
        });
    }
};

module.exports = {
    authenticateJwt,
    SECRET
};