const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require("../models");
const User = db.user;
const key = require('./keys.config').secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = async (passport) => {

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await User.findByPk(jwt_payload.id);
            if (user) return done(null, user);
            return done(null, false);
        })
    );
};
