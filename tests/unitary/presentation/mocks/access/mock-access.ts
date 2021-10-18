import { FindAmountAccess } from '@/domain/usescasses/access/find-amount-access'
import { IncrementAmountAccess } from '@/domain/usescasses/access/increment-amout-access'

export const makeDbFindAmountAccess = (): FindAmountAccess => {
  class FindAmountAccessStub implements FindAmountAccess {
    async findAmount (): Promise<string> {
      return await new Promise(resolve => resolve('1'))
    }
  }
  return new FindAmountAccessStub()
}

export const makeDbIncrementAmountAccess = (): IncrementAmountAccess => {
  class IncrementAmountAccessStub implements IncrementAmountAccess {
    async incrementAmount (): Promise<string> {
      return await new Promise(resolve => resolve('1'))
    }
  }
  return new IncrementAmountAccessStub()
}
