import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerDocs from '../docs/swagger.json'

export default (app: Express): void => {
  app.use('/api-docs', serve, setup(swaggerDocs))
}
