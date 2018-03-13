const passport = require('koa-passport');
const { Strategy, ExtractJwt, } = require('passport-jwt');
const dbConnector = require('../Connectors/psql');

const {
  UserByEmailRequest,
} = require('../Contracts/ConnectorWithService/users');

const config = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_KEY,
};

passport.use(
  new Strategy(config, async (jwt_payload, done) => {
    try {
      const user = await dbConnector.getUserByEmail(
        new UserByEmailRequest(jwt_payload.email)
      );
      if (!user.id) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
