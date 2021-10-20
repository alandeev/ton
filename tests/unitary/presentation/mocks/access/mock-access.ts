import { FindAmountAccess } from '@/domain/usescasses/access/find-amount-access'
import { IncrementAmountAccess } from '@/domain/usescasses/access/increment-amout-access'
import { Result } from 'countapi-js'

export const makeDbFindAmountAccess = (): FindAmountAccess => {
  class FindAmountAccessStub implements FindAmountAccess {
    async findAmount (): Promise<Result> {
      return await new Promise(resolve => resolve({
        status: 200,
        path: 'any_path',
        value: 1
      }))
    }
  }
  return new FindAmountAccessStub()
}

export const makeDbIncrementAmountAccess = (): IncrementAmountAccess => {
  class IncrementAmountAccessStub implements IncrementAmountAccess {
    async incrementAmount (): Promise<Result> {
      return await new Promise(resolve => resolve({
        status: 200,
        path: 'any_path',
        value: 1
      }))
    }
  }
  return new IncrementAmountAccessStub()
}
