import dotenv from 'dotenv';
import koa from 'koa';
import koaRouter from 'koa-router'
import logger from "./system/log/logger";
import dbSetup from "./system/database/dbSetup";
import bodyParser from "koa-bodyparser";
import Securitysetup from "./system/security/securitysetup";
import apiRouter from "./common/router";

dotenv.config();
const app = new koa();
app.use(bodyParser());

const router = new koaRouter();

//database setup
dbSetup();

//secutiy setup
Securitysetup(app);


//Router Setup
router.use('/api', apiRouter.routes());
app.use(router.routes()).use(router.allowedMethods());



app.listen(5000, () => {
  logger.info("server started on port 5000");
});
