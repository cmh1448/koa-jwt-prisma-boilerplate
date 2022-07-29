import prisma from "./prisma";
import logger from "../log/logger";


export default () => {
  prisma.$connect()
    .then(() => logger.info("DB CONNECTED"))
    .catch((err) => logger.error("DB CONNECTION FAILED\n", err));
}