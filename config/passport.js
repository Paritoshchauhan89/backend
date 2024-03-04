import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/userModel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    let user = await userModel.findOne({ googleId: profile.id });
    if (!user) {
      user = await userModel.create({
        googleId: profile.id,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value
      });
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
