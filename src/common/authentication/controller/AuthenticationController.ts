import Router, {RouterContext} from "koa-router";
import {login, register} from "../service/AuthenticationService";
import {jwtAccess} from "../../../system/security/passport/authguard";
import {toUserDetail} from "../../user/dto/userdto";

const domainRouter = new Router();

domainRouter.post('/login', login);
domainRouter.post('/register', register)
domainRouter.get('/test', jwtAccess, (ctx: RouterContext) => {
  ctx.body = toUserDetail(ctx.state.user);
})

export default domainRouter;