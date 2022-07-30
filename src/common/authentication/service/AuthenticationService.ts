import {RouterContext} from "koa-router";
import {Next} from "koa";
import passport from "koa-passport";
import logger from "../../../system/log/logger";
import {createAccessToken, createHashedPassword, createRefreshToken} from "../../../system/security/securityutil";
import prisma from "../../../system/database/prisma";
import Prisma from "../../../system/database/prisma";

export const login = async (ctx: RouterContext, next: Next) => {
  await passport.authenticate(
    'local',
    { session: false },
    (err, user, info) => {
      logger.debug(user.email + ' is tying to login');
      if (err || !user) {
        ctx.status = 400;
        ctx.body = {
          message: 'Authentication Error',
          user: user,
        };
        logger.info(user.email + ' faced authentication error');
      } else {
        ctx
          .login(user)
          .catch((err) => {
            ctx.body = err;
          })
          .then(() => {
            ctx.body = {
              refreshToken: createRefreshToken(user),
              accessToken: createAccessToken(user),
              user: user,
            };
          });

        logger.info(user.email + ' is logged in');
      }
    },
  )(ctx, next);
};

export const register = async (ctx: RouterContext) => {
  const { email, name, password } = ctx.request.body;
  const { salt, hash } = createHashedPassword(password);

  const user = await prisma.user.create({
    data: {
      password: hash,
      salt: salt,
      email: email,
      name: name,
      stateMessage: ''
    }
  });

  ctx.body = user;
};