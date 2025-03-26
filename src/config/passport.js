const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models/User');

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET || "default_secret",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    console.log("🔍 JWT Payload:", payload);  // Debugging
    const user = await User.findById(payload.id);
    
    if (!user) {
      console.error("❌ User not found for ID:", payload.id);
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    console.error("❌ Error in JWT verification:", error);
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
module.exports = { jwtStrategy };
