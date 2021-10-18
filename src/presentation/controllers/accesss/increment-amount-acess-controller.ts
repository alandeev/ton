import { IncrementAmountAccess } from '@/domain/usescasses/access/increment-amout-access'
import { ok } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols'
import { HttpResponse, Controller } from './access-controller-protocols'

export class IncrementAmountAccessController implements Controller {
  constructor (
    private readonly incrementAmountAccess: IncrementAmountAccess,
    private readonly erroHandle: ErrorHandler
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const access = await this.incrementAmountAccess.incrementAmount()

      return ok(`A quantidade de acessos no site do TON acaba de ser incrementada e no momento é de: ${access}`)
    } catch (error) {
      return this.erroHandle.handle(error)
    }
  }
}
