const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const User = require('./helpers/User');
const Devices = require('./helpers/Devices');
const config = process.env.SPOTIFYID ? {
  clientID: process.env.SPOTIFYID,
  clientSecret: process.env.SPOTIFYSECRET,
} : require('../../config');

const baseURL = process.env.BASEURL || 'http://localhost:8080';

passport.use(new SpotifyStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: `${baseURL}/auth/spotify/callback`,
},
  (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    User.login(profile)
      .then(userInfo => done(null, userInfo))
      .catch(err => console.log(err));
  }));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

exports.checkAuth = (req, res, next) => {
  if (!req.isAuthenticated) res.status(403).send();
  else return next();
};
