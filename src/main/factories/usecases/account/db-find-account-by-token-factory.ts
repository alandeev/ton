import { DbFindAccountByToken } from '@/data/usescases/account/find-account-by-token/db-find-account-by-token'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { FindAccountByToken } from '@/domain/usescasses/account/find-account-by-token'
import { AccountRepository } from '@/infra/db/typeorm/modules/account/account-repository'

export const makeDbLoadAccountByToken = (): FindAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const accountRepository = new AccountRepository()
  return new DbFindAccountByToken(jwtAdapter, accountRepository)
}
