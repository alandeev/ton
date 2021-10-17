import { UpdateAccountParams } from '@/domain/usescasses/account/update-account'
import { makeAccountModel } from '@/tests/domain/mocks/auth/account/account-mocks'
import { FindAccountByIdRepository } from '../protocols/db/account/find-account-by-id-repository'
import { RemoveAccountRepository } from '../protocols/db/account/remove-account-repository'
import { UpdateAccountRepository } from '../protocols/db/account/update-account-repository'
import { AccountModel, AddAccountParams, AddAccountRepository, Hasher } from '../usescases/account/db-accounts-protocols'

export const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeAccountModel()))
    }
  }

  return new AddAccountRepositoryStub()
}

export const makeRemoveAccountRepositoryStub = (): RemoveAccountRepository => {
  class RemoveAccountRepositoryStub implements RemoveAccountRepository {
    async remove (accountId: string): Promise<number> {
      return await new Promise(resolve => resolve(1))
    }
  }
  return new RemoveAccountRepositoryStub()
}

export const makeAccountByIdRepository = (): FindAccountByIdRepository => {
  class AccountsByIdRepositoryStub implements FindAccountByIdRepository {
    async findById (idAccount: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeAccountModel()))
    }
  }
  return new AccountsByIdRepositoryStub()
}

export const makeUpdateAccountRepository = (): UpdateAccountRepository => {
  class UpdateAccountRepositoryStub implements UpdateAccountRepository {
    async update (accountId: string, accountData: UpdateAccountParams): Promise<number> {
      return await new Promise(resolve => resolve(1))
    }
  }

  return new UpdateAccountRepositoryStub()
}

export const makeHasherAccountRepository = (): Hasher => {
  class HasherAccountRepository implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_hash'))
    }
  }

  return new HasherAccountRepository()
}
