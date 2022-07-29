import dotenv from 'dotenv';
import koa from 'koa';
import logger from "./system/log/logger";
import dbSetup from "./system/database/dbSetup";

dotenv.config();
const app = new koa();

dbSetup();


app.listen(5000, () => {
  logger.info("server started on port 5000");
});
