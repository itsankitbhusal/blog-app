import { response, Router } from "express";
import passport from "passport"

import AuthController from "../controllers/authController.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();
const authController = new AuthController();



// auth/
router.get("/", (req, res) => {
    // res.json("Auth Router!");
    res.send("<a href='/auth/google'>Login with Google</a>");
});

// auth/google route for google authentication from authController
// use google login middleware from authController
// router.get("/google", authController.googleLogin);

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

// auth/register
router.post("/register", authController.addUser);

// login user
router.post("/login", authController.loginUser);

// delete user
router.delete("/delete/:id", validateToken, authController.removeUser);

// update user
router.put("/update/:id", validateToken, authController.updateUser);



export default router;