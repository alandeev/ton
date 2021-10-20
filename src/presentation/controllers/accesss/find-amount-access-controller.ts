import { EnumError } from '@/domain/enums/enum-error'
import { FindAmountAccess } from '@/domain/usescasses/access/find-amount-access'
import { badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols'
import { Result } from 'countapi-js'
import { HttpResponse, Controller } from './access-controller-protocols'

export class FindAmountAccessController implements Controller {
  constructor (
    private readonly findAmountAccess: FindAmountAccess,
    private readonly erroHandle: ErrorHandler
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const amountAccessResult: Result = await this.findAmountAccess.findAmount()

      if (amountAccessResult.status === EnumError.BADREQUEST.value) {
        return badRequest('Erro ao buscar a quantidade de acessos ao site da TON')
      }

      if (amountAccessResult.status === EnumError.NOTFOUND.value) {
        return badRequest('A chave não existe no count api')
      }

      return ok(`A quantidade de acessos no site do TON no momento é de: ${amountAccessResult.value}`)
    } catch (error) {
      return this.erroHandle.handle(error)
    }
  }
}
