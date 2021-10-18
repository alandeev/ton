import { Controller, ErrorHandler, HttpRequest, Validation } from '@/presentation/protocols'
import { makeErrorHandler, makeValidation } from '@/tests/unitary/presentation/mocks/controller-helpers'
import MockDate from 'mockdate'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { AddPermissionGroup } from '@/domain/usescasses/permission-group/add-permission-group'
import { makeAddPermissionGroupRepository } from '@/tests/unitary/data/mocks/mock-permission-group'
import { AddPermissionGroupController } from '@/presentation/controllers/permission-group/add-permission-group-controller'
import { makePermissionModel } from '@/tests/unitary/domain/mocks/auth/permission-group/permission-group-mocks'

interface SutTypes {
  validationStub: Validation
  errorHandlerStub: ErrorHandler
  addPermissionGroupStub: AddPermissionGroup
  sut: Controller
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const errorHandlerStub = makeErrorHandler()
  const addPermissionGroupStub = makeAddPermissionGroupRepository()

  const sut = new AddPermissionGroupController(addPermissionGroupStub, validationStub, errorHandlerStub)

  return {
    addPermissionGroupStub,
    errorHandlerStub,
    validationStub,
    sut
  }
}

const makeParams = (): HttpRequest => ({
  body: {
    name: 'any_name',
    permission: [makePermissionModel()]
  }
})

describe('AddPermissionGroupController', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  test('Should call add with correct params', async () => {
    const { sut, addPermissionGroupStub } = makeSut()
    const addSpy = jest.spyOn(addPermissionGroupStub, 'add')
    await sut.handle(makeParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      permission: [makePermissionModel()]
    })
  })

  test('Should return badRequest if validation returns error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
    const response = await sut.handle(makeParams())

    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call errorHandler if controller throws', async () => {
    const { sut, addPermissionGroupStub, errorHandlerStub } = makeSut()

    jest.spyOn(addPermissionGroupStub, 'add').mockRejectedValue(new Error())
    const handleSpy = jest.spyOn(errorHandlerStub, 'handle')

    await sut.handle(makeParams())

    expect(handleSpy).toHaveBeenCalledWith(new Error())
  })
})
