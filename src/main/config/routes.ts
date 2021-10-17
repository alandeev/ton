import { Express, Router } from 'express'
import accessRoutes from '../routes/access-routes'
import authRoutes from '../routes/auth-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/', router)
  authRoutes(router)
  accessRoutes(router)
}
