import dotenv from 'dotenv';
import koa from 'koa';
import logger from './configuration/log/logger';

dotenv.config();
const app = new koa();


app.listen(5000, () => {
  logger.info("server started on port 5000");
});
