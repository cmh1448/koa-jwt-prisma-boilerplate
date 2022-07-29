import { Context, Next } from 'koa';
import logger from '../log/logger';

export interface ExceptionInterface extends Error {
  code: number;
}

export class Exception extends Error implements ExceptionInterface {
  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
  }

  code: number;
}

export async function exceptionHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (ex: any) {
    ctx.body = ex.message;
    ctx.status = ex.code ?? 500;
    logger.error(ex.message);
  }
}