import { DbIncrementAmountAccess } from '@/data/usescases/access/db-increment-amout-access'
import { IncrementAmountAccess } from '@/domain/usescasses/access/increment-amout-access'

export const makeDbIncrementAmountAccess = (): IncrementAmountAccess => {
  return new DbIncrementAmountAccess()
}
