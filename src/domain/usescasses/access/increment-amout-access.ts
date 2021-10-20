import { Result } from 'countapi-js'

export interface IncrementAmountAccess {
  incrementAmount: () => Promise<Result>
}
