const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
const mongoose = require("mongoose");
const Bbs = mongoose.model("bbs");
const passport = require('koa-passport');
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        // console.log(jwt_payload);
        const user = await Bbs.findById(jwt_payload.id);
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }));
    module.exports = passport=>{

    };
