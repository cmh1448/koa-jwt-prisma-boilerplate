import { Context, Next } from 'koa';
import logger from '../log/logger';

export interface ExeptionInterface extends Error {
  code: number;
}

export class Exeption extends Error implements ExeptionInterface {
  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
  }

  code: number;
}

export async function exeptionHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (ex: any) {
    ctx.body = ex.message;
    ctx.status = ex.code ?? 500;
    logger.error(ex.message);
  }
}