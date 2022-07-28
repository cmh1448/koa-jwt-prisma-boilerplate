import { PrismaClient } from "@prisma/client";
import logger from "../log/logger";

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => logger.info("PRISMA DB CONNECTED"));

export default prisma;