import { Controller, ErrorHandler, HttpRequest, Validation } from '@/presentation/protocols'
import { makeErrorHandler, makeValidation } from '@/tests/presentation/mocks/controller-helpers'
import MockDate from 'mockdate'
import { badRequest, noContent, notFound } from '@/presentation/helpers/http/http-helper'
import { UpdateAccount } from '@/domain/usescasses/account/update-account'
import { makeUpdateAccountRepository } from '@/tests/data/mocks/mock-account'
import { UpdateAccountController } from '@/presentation/controllers/account/update-account-controller'
import { makePermissionGroupModel } from '@/tests/domain/mocks/auth/permission-group/permission-group-mocks'
import { EnumUserRole } from '@/domain/enums/enum-user-role'

interface SutTypes {
  validatorStub: Validation
  errorHandlerStub: ErrorHandler
  updateAccountStub: UpdateAccount
  sut: Controller
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidation()
  const errorHandlerStub = makeErrorHandler()
  const updateAccountStub = makeUpdateAccountRepository()
  const sut = new UpdateAccountController(updateAccountStub, validatorStub, errorHandlerStub)

  return {
    updateAccountStub,
    errorHandlerStub,
    validatorStub,
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

describe('UpdateAccountController', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('Should call update with correct params', async () => {
    const { sut, updateAccountStub } = makeSut()

    const updateSpy = jest.spyOn(updateAccountStub, 'update')
    await sut.handle(makeParams())

    expect(updateSpy).toHaveBeenCalledWith('any_base_entity_id', {
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

  test('Should return badRequest if validation return an error', async () => {
    const { sut, validatorStub } = makeSut()

    jest.spyOn(validatorStub, 'validate').mockReturnValue(new Error())
    const response = await sut.handle(makeParams())

    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call errorHandler if controller throws', async () => {
    const { sut, updateAccountStub, errorHandlerStub } = makeSut()

    jest.spyOn(updateAccountStub, 'update').mockRejectedValue(new Error())
    const handleSpy = jest.spyOn(errorHandlerStub, 'handle')
    await sut.handle(makeParams())

    expect(handleSpy).toHaveBeenCalledWith(new Error())
  })

  test('Should return notFound if update doesnt returns affected row quantity', async () => {
    const { sut, updateAccountStub } = makeSut()
    jest.spyOn(updateAccountStub, 'update').mockResolvedValue(0)
    const response = await sut.handle(makeParams())
    expect(response).toEqual(notFound())
  })

  test('Should return noContent on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(makeParams())

    expect(response).toEqual(noContent())
  })
})
