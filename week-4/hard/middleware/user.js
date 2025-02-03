const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                message: "Token is required"
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.userId = verified.id;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = userMiddleware;