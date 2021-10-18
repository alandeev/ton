import {
  HashComparer,
  AddAccountsParams,
  FindAccountByEmailRepository,
  AuthResponse,
  Authentication,
  Encrypter
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) { }

  async auth (authentication: AddAccountsParams): Promise<AuthResponse> {
    const account = await this.findAccountByEmailRepository.findByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const { id, name, email, role } = account
        const accessToken = await this.encrypter.encrypt(id, role)
        return {
          user: { name, email, id, accountRole: role },
          accessToken
        }
      }
    }
    return null
  }
}
