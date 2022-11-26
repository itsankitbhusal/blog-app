// middleware to validate token
import "dotenv/config";
import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
    // check if token is provided in headers
    if (!req.headers.token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    // verify token
    jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
        } else {
            // token is valid
            // pass authData to next middleware
            req.tokenData = authData;
            next();
        }
    });
}
export default validateToken;