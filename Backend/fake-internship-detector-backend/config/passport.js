// Passport.js Google OAuth Configuration
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User-sqlite");

/**
 * Configure Passport with Google OAuth 2.0 Strategy
 */
module.exports = function (passport) {
  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Extract user information from Google profile
          const userData = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          };

          // Check if user already exists in database
          let user = await User.findOne({ where: { googleId: profile.id } });

          if (user) {
            // User exists - return existing user
            console.log(`✅ Existing user logged in: ${user.email}`);
            done(null, user);
          } else {
            // Create new user in database
            user = await User.create(userData);
            console.log(`🆕 New user created: ${user.email}`);
            done(null, user);
          }
        } catch (error) {
          console.error(`❌ OAuth Error: ${error.message}`);
          done(error, null);
        }
      }
    )
  );

  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
