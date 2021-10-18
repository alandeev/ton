import { AuthMiddleware } from '@/presentation/middlewares/auth/auth-middleware'
import { Middleware } from '@/presentation/protocols'
import { makeDbLoadAccountByToken } from '../usecases/account/db-find-account-by-token-factory'

export const makeAuthMiddleware = (target: string, action: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), target, action)
}
