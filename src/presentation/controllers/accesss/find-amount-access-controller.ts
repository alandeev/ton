import { FindAmountAccess } from '@/domain/usescasses/access/find-amount-access'
import { ok } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols'
import { HttpResponse, Controller } from './access-controller-protocols'

export class FindAmountAccessController implements Controller {
  constructor (
    private readonly findAmountAccess: FindAmountAccess,
    private readonly erroHandle: ErrorHandler
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const access = await this.findAmountAccess.findAmount()

      return ok(`A quantidade de acessos no site do TON no momento é de: ${access}`)
    } catch (error) {
      return this.erroHandle.handle(error)
    }
  }
}
