import { Next } from 'koa';
import { IMiddleware, RouterContext } from 'koa-router';
import passport from 'passport';
import {Role} from "../../../common/user/enums/Role";
import {Exception} from "../../exception/exception";


const checkRole = (permitedRoles: Role[]) => {
  return async (ctx: RouterContext, next: Next) => {
    const user = ctx.state.user;
    if (user) {
      if (permitedRoles.includes(user.role)) {
        await next();
      } else {
        throw new Exception('Forbidden', 403);
      }
    } else {
      throw new Exception('Unauthorized', 401);
    }
  };
};

export const jwtAccess = passport.authenticate('jwt-access', {
  session: false,
});

export const jwtRefresh = passport.authenticate('jwt-refresh', {
  session: false,
});

export function roleAcess(permitedRoles: Role[]): IMiddleware[] {
  return [jwtAccess, checkRole(permitedRoles)];
}