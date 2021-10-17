import { AccountModelResponse } from '@/data/usescases/account/db-accounts-protocols'

export interface FindAccountByPermissionRepository {
  findByPermission: (id: string, target: string, action: string) => Promise<AccountModelResponse>
}
