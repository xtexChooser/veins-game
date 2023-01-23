import Koa from 'koa'
import Router from '@koa/router'
import serve from 'koa-static'
import pino from 'koa-pino-logger'
import logger from './logger.js'

const app = new Koa()

const router = new Router()
/*
router.get('/', (ctx) => {
  // ctx.router available
  ctx.body = "test"
  ctx.log.info('test')
})*/

app
  .use(pino({ logger }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('public'))
  .listen(3000)
