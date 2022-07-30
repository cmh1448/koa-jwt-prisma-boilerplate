import Router from 'koa-router';
import authenticationController from "./authentication/controller/AuthenticationController";

const apiRouter = new Router();

apiRouter.use('/auth', authenticationController.routes());

export default apiRouter;