import { FindAmountAccess } from '@/domain/usescasses/access/find-amount-access'
import countapi, { Result } from 'countapi-js'

export class DbFindAmountAccess implements FindAmountAccess {
  async findAmount (): Promise<Result> {
    const countApiResult: Result = await countapi.get('ton.com.br', 'visits')

    return countApiResult
  }
}
