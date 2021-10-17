import { AccountModelResponse } from '@/domain/models/account'
import { FindAccountByToken } from '@/domain/usescasses/account/find-account-by-token'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { FindAccountByPermissionRepository } from '@/data/protocols/db/account/find-account-by-permission-repository'

interface DescryptedToken {
  id: string
}
export class DbFindAccountByToken implements FindAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly findAccountByIdRepository: FindAccountByPermissionRepository
  ) {}

  async find (accessToken: string, target: string, action: string): Promise<AccountModelResponse> {
    const descryptedToken: DescryptedToken = await this.decrypter.decrypt(accessToken) as DescryptedToken

    if (descryptedToken?.id) {
      const account = await this.findAccountByIdRepository.findByPermission(descryptedToken.id, target, action)

      if (account) {
        return account
      }
    }
    return null
  }
}
