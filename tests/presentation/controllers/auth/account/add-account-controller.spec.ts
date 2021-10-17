import { Controller, ErrorHandler, HttpRequest, Validation } from '@/presentation/protocols'
import { makeErrorHandler, makeValidation } from '@/tests/presentation/mocks/controller-helpers'
import MockDate from 'mockdate'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { AddAccount } from '@/domain/usescasses/account/add-account'
import { AddAccountController } from '@/presentation/controllers/account/add-account-controller'
import { makeAddAccountRepository } from '@/tests/data/mocks/mock-account'
import { makePermissionGroupModel } from '@/tests/domain/mocks/auth/permission-group/permission-group-mocks'
import { EnumUserRole } from '@/domain/enums/enum-user-role'

interface SutTypes {
  validationStub: Validation
  errorHandlerStub: ErrorHandler
  addAccountStub: AddAccount
  sut: Controller
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const errorHandlerStub = makeErrorHandler()
  const addAccountStub = makeAddAccountRepository()

  const sut = new AddAccountController(addAccountStub, validationStub, errorHandlerStub)

  return {
    addAccountStub,
    errorHandlerStub,
    validationStub,
    sut
  }
}

const makeParams = (): HttpRequest => ({
  body: {
    role: EnumUserRole.INTERNO.value,
    name: 'any_account_name',
    documenty: 'any_account_documenty',
    email: 'any_account_email',
    phone: 'any_account_phone',
    password: 'any_account_password',
    permission_group: makePermissionGroupModel(),
    entity: { id: 'any_base_entity_id' }
  },
  params: {
    accountEntityId: 'any_base_entity_id',
    id: 'any_base_entity_id'
  }
})

describe('AddAccountController', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  test('Should call add with correct params', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeParams())
    expect(addSpy).toHaveBeenCalledWith({
      role: EnumUserRole.INTERNO.value,
      name: 'any_account_name',
      documenty: 'any_account_documenty',
      email: 'any_account_email',
      phone: 'any_account_phone',
      password: 'any_account_password',
      permission_group: makePermissionGroupModel(),
      entity: { id: 'any_base_entity_id' }
    })
  })

  test('Should return badRequest if validation returns error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
    const response = await sut.handle(makeParams())

    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call errorHandler if controller throws', async () => {
    const { sut, addAccountStub, errorHandlerStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockRejectedValue(new Error())
    const handleSpy = jest.spyOn(errorHandlerStub, 'handle')

    await sut.handle(makeParams())

    expect(handleSpy).toHaveBeenCalledWith(new Error())
  })
})
