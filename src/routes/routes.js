import combineRoutes from 'koa-combine-routers'

import demoRouter from'./demoRouter'

module.exports = combineRoutes(
  demoRouter,
)
