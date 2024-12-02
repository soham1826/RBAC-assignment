import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

passport.use(
    // We are using Google OAuth for Login here 
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // First try to find by Google ID
        let user = await User.findOne({ googleId: profile.id });
        
        // If not found by Google ID, try by email (as user may have registered normally without using OAuth)
        if (!user) {
          user = await User.findOne({ email: profile.emails?.[0].value });
        }

        if (user) {
          // If user exists but doesn't have googleId, update it
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }

        // If user doesn't exist, create a new one
        const newUser = new User({
          email: profile.emails?.[0].value,
          googleId: profile.id,
          role: 'user' // By default giving goole users role as "user" which only admin can change
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
