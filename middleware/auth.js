// auth middleware
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(421).json({ error: "authorization failed" });
        }
        const decodedToken = jwt.verify(token, "super-secet-text");
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return res.status(401).json({ error: " auhorization failed" });
    }
};