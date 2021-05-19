import Koa from 'koa'
import path from 'path'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose'
import compress from 'koa-compress'

const app = new Koa()

const isDevMode = process.env.NODE_ENV !== 'production'

/**
 * 使用koa-compose：整合中间件
 * @type {compose.ComposedMiddleware<unknown>}
 */
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, 'src/public')),
  cors(),
  jsonutil({pretty: false, param: 'pretty'}),
  helmet()
])

if(!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(3000, () => {
  console.log('open Koa http://localhost:3000/')
})
