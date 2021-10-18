import { FindAmountAccess } from '@/domain/usescasses/access/find-amount-access'
import countapi, { Result } from 'countapi-js'

export class DbFindAmountAccess implements FindAmountAccess {
  async findAmount (): Promise<number> {
    const countApiResult: Result = await countapi.get('ton.com.br', 'visits')

    const amountAccess = countApiResult.value

    return amountAccess
  }
}
