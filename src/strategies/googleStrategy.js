import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import users from "../models/userModel.js";
import jwt from "jsonwebtoken"

passport.use(new Strategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/google/callback",
        scope: ["profile", "email"],

    },
    async function verify(accessToken, refreshToken, profile, cb) {
        // get firstName, lastName, email, profilePic from profile
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const email = profile.emails[0].value;
        let token = "";
        try {
            // find or create user
            const [user, created] = await users.findOrCreate({ where: { email }, defaults: { firstName, lastName } });
            // check if user created or found
            // create token if user already exists
            if (!created) {
                token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            }
            if (created) {
                // make jwt token and send to client
                token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            }

        } catch (error) {
            console.log("Error finding or creating user: ", error);
        }
        return cb(null, { token, firstName, lastName, email });
    }
));