import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/userModel.js';
import 'dotenv/config';


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      // Read profile information and create or find user in the database
      let user = await userModel.findOne({ googleId: profile.id });
      if (!user) {
        // Create a new user if not found in the database
        user = await userModel.create({
          googleId: profile.id,
          fullName: profile.name.givenName,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        });
      }
  
      // Pass the user object to the done callback
      return done(null, user);
    } catch (error) {
      // Handle errors and pass them to the done callback
      return done(error);
    }
  }
  
));

export default passport;
