import { AccountModelResponse } from '@/data/usescases/account/db-accounts-protocols'

export interface FindAccountByTokenRepository {
  findByToken: (accessToken: string, role?: string) => Promise<AccountModelResponse>
}
