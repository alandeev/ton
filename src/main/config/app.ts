import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupEnv from './env'
import setupPGNumberOverride from './pg-numeric-format'
import setupSwagger from './config-swagger'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
setupEnv()
setupPGNumberOverride()
export default app
