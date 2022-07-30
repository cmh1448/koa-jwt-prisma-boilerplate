import Router, {RouterContext} from "koa-router";
import {login, register} from "../service/AuthenticationService";

const domainRouter = new Router();

domainRouter.post('/login', login);
domainRouter.post('/register', register)
domainRouter.get('/test', (ctx: RouterContext) => {
  ctx.body = "ok"
})
export default domainRouter;