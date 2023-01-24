import Koa from "koa";
import Router from "@koa/router";
import serve from "koa-static";
import pino from "koa-pino-logger";
import { koaBody } from "koa-body";
import logger from "./logger.js";
import makeChallenge1 from "./chall1.js";
import makeChallenge2 from "./chall2.js";
import makeChallenge3 from "./chall3.js";
import makeChallenge4 from "./chall4.js";
import makeChallenge5 from "./chall5.js";
import makeEnd from "./end.js";

const app = new Koa();

const router = new Router();

makeChallenge1(router);
makeChallenge2(router);
makeChallenge3(router);
makeChallenge4(router);
makeChallenge5(router);
makeEnd(router);

app
  .use(pino({ logger }))
  .use(koaBody())
  .use(router.routes())
  .use(serve("public"))
  .use(router.allowedMethods())
  .listen(3000);
