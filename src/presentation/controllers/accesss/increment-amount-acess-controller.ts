import { EnumError } from '@/domain/enums/enum-error'
import { IncrementAmountAccess } from '@/domain/usescasses/access/increment-amout-access'
import { badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols'
import { HttpResponse, Controller } from './access-controller-protocols'

export class IncrementAmountAccessController implements Controller {
  constructor (
    private readonly incrementAmountAccess: IncrementAmountAccess,
    private readonly erroHandle: ErrorHandler
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const incrementAmountAccessResult = await this.incrementAmountAccess.incrementAmount()

      if (incrementAmountAccessResult.status === EnumError.NOTFOUND.value) {
        return badRequest('A chave não existe no count api')
      }

      return ok(`A quantidade de acessos no site do TON acaba de ser incrementada e no momento é de: ${incrementAmountAccessResult.value}`)
    } catch (error) {
      return this.erroHandle.handle(error)
    }
  }
}
