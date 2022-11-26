import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      done(null, { user: profile });
    }
  )
);
