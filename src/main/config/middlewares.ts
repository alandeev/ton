import { Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'
import swaggerUI from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
}
