import { Result } from 'countapi-js'

export interface FindAmountAccess {
  findAmount: () => Promise<Result>
}
