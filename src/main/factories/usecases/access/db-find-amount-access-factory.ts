import { DbFindAmountAccess } from '@/data/usescases/access/db-find-amount-access'
import { FindAmountAccess } from '@/domain/usescasses/access/find-amount-access'

export const makeDbFindAmountAccess = (): FindAmountAccess => {
  return new DbFindAmountAccess()
}
