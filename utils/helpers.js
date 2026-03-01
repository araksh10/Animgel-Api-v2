const jwt = require("jsonwebtoken");

const authGuard = (req) => {
    const token = req.cookies?.token;
    if (!token) {
        throw new Error("No Authentication completed.");
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // return decoded;

    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (error) {
        throw new Error("Unable to authenticate token.");
    }
};

module.exports = authGuard;