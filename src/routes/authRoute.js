import { Router } from "express";
import passport from "passport";

import AuthController from "../controllers/authController.js";
import validateToken from "../middlewares/validateToken.js";

// for backend
// import * as googleStrategy from "../strategies/googleStrategy.js";

const router = Router();
const authController = new AuthController();


// google login
router.post('/google', authController.googleLogin);

/* FOR BACKEND ONLY IMPLEMENTATION
router.get(
    "/google",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        res.status(200).json({
            message: "Google Oauth",
            statusCode: res.statusCode,
        });
    }
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        res.status(200).json({
            user: req.user
        });
    }
);
*/
// auth/verifyJWT route for verifying the token
router.post("/verifyJWT", authController.verifyJWT);

// auth/register
router.post("/register", authController.addUser);

// login user
router.post("/login", authController.loginUser);

// delete user
router.delete("/delete/:id", validateToken, authController.removeUser);

// update user
router.put("/update/:id", validateToken, authController.updateUser);

export default router;
