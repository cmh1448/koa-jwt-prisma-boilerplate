import logger from "../log/logger";
import koaPassport from "koa-passport";
import passportConfig from "./passport/passport-config";

export default (app: any) => {
  logger.info('Security Configured');

  app.use(koaPassport.initialize());
  // app.use(passport.session());
  
  passportConfig();
};