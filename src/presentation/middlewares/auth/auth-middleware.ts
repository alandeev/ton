import { FindAccountByToken } from '@/domain/usescasses/account/find-account-by-token'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Middleware } from '@/presentation/protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly findAccountByToken: FindAccountByToken,
    private readonly target: string,
    private readonly action: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.authorization

      if (accessToken) {
        const account = await this.findAccountByToken.find(accessToken, this.target, this.action)

        if (account) {
          return ok({ accountId: account.id, accountEntityId: account.entity.id, accountRole: account.role })
        }
      }

      return forbidden()
    } catch (error) {
      return serverError(error)
    }
  }
}
