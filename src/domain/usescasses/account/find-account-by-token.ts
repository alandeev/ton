import { AccountModelResponse } from '@/domain/models/account'

export interface FindAccountByToken {
  find: (accessToken: string, target: string, action: string) => Promise<AccountModelResponse>
}
