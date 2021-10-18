import { DbAddAccount } from '@/data/usescases/account/db-add-account'
import { AddAccount, AddAccountParams, AddAccountRepository } from '@/data/usescases/account/db-accounts-protocols'
import { EnumUserRole } from '@/domain/enums/enum-user-role'
import { makeAddAccountRepository, makeHasherAccountRepository } from '@/tests/unitary/data/mocks/mock-account'
import { makeAccountModel } from '@/tests/unitary/domain/mocks/auth/account/account-mocks'
import { makePermissionGroupModel } from '@/tests/unitary/domain/mocks/auth/permission-group/permission-group-mocks'
import MockDate from 'mockdate'

interface SutTypes {
  addAccountRepositoryStub: AddAccountRepository
  sut: AddAccount
}

const makeSut = (): SutTypes => {
  const hasher = makeHasherAccountRepository()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hasher, addAccountRepositoryStub)

  return {
    addAccountRepositoryStub,
    sut
  }
}

const makeParams = (): AddAccountParams => ({
  name: 'any_account_name',
  documenty: 'any_account_documenty',
  email: 'any_account_email',
  phone: 'any_account_phone',
  password: 'any_hash',
  enabled: false,
  permission_group: makePermissionGroupModel(),
  first_login: true,
  entity: { id: 'any_id' },
  role: EnumUserRole.INTERNO.value
})

describe('DbAddAccount', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  test('Should call add repository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeParams())

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_account_name',
      documenty: 'any_account_documenty',
      email: 'any_account_email',
      phone: 'any_account_phone',
      password: 'any_hash',
      enabled: false,
      permission_group: makePermissionGroupModel(),
      first_login: true,
      entity: { id: 'any_id' },
      role: EnumUserRole.INTERNO.value
    })
  })

  test('Should return a account on success', async () => {
    const { sut } = makeSut()
    const response = await sut.add(makeParams())

    expect(response).toEqual(makeAccountModel())
  })

  test('Should throw if repository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValue(new Error())
    const promise = sut.add(makeParams())

    await expect(promise).rejects.toThrow(new Error())
  })
})
