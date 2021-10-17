import { AccountModelResponse } from '@/domain/models/account'

export interface AccountByPartnerPageResponse {
  data: AccountModelResponse[]
  total: number
}

export interface FindAllAccountByPartner {
  findAllByPartner: (accountEntityId: string, page: number, offset: number, filter?: string, orderBy?: string) => Promise<AccountByPartnerPageResponse>
}
