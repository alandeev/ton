import { IncrementAmountAccess } from '@/domain/usescasses/access/increment-amout-access'
import countapi, { Result } from 'countapi-js'

export class DbIncrementAmountAccess implements IncrementAmountAccess {
  async incrementAmount (): Promise<number> {
    const incrementAmountAcess: Result = await countapi.hit('ton.com.br', 'visits')

    return incrementAmountAcess.value
  }
}
