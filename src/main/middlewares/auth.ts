import { adaptMiddleware } from '@/main/adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'

export const auth = (target: string, action: string): any => adaptMiddleware(makeAuthMiddleware(target, action))
