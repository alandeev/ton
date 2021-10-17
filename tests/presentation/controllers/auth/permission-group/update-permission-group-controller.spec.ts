import { Controller, ErrorHandler, HttpRequest, Validation } from '@/presentation/protocols'
import { makeErrorHandler, makeValidation } from '@/tests/presentation/mocks/controller-helpers'
import MockDate from 'mockdate'
import { badRequest, noContent, notFound } from '@/presentation/helpers/http/http-helper'
import { UpdatePermissionGroup } from '@/domain/usescasses/permission-group/update-permission-group'
import { makeUpdatePermissionGroupRepository } from '@/tests/data/mocks/mock-permission-group'
import { UpdatePermissionGroupController } from '@/presentation/controllers/permission-group/update-permission-group-controller'
import { makePermissionModel } from '@/tests/domain/mocks/auth/permission-group/permission-group-mocks'

interface SutTypes {
  validatorStub: Validation
  errorHandlerStub: ErrorHandler
  updatePermissionGroupStub: UpdatePermissionGroup
  sut: Controller
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidation()
  const errorHandlerStub = makeErrorHandler()
  const updatePermissionGroupStub = makeUpdatePermissionGroupRepository()
  const sut = new UpdatePermissionGroupController(updatePermissionGroupStub, validatorStub, errorHandlerStub)

  return {
    updatePermissionGroupStub,
    errorHandlerStub,
    validatorStub,
    sut
  }
}

const makeParams = (): HttpRequest => ({
  body: {
    name: 'any_name',
    permission: [makePermissionModel()]
  },
  params: {
    id: 'any_id'
  }
})

describe('UpdatePermissionGroupController', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('Should call update with correct params', async () => {
    const { sut, updatePermissionGroupStub } = makeSut()

    const updateSpy = jest.spyOn(updatePermissionGroupStub, 'update')
    await sut.handle(makeParams())

    expect(updateSpy).toHaveBeenCalledWith('any_id', {
      name: 'any_name',
      permission: [makePermissionModel()]
    })
  })

  test('Should return badRequest if validation return an error', async () => {
    const { sut, validatorStub } = makeSut()

    jest.spyOn(validatorStub, 'validate').mockReturnValue(new Error())
    const response = await sut.handle(makeParams())

    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call errorHandler if controller throws', async () => {
    const { sut, updatePermissionGroupStub, errorHandlerStub } = makeSut()

    jest.spyOn(updatePermissionGroupStub, 'update').mockRejectedValue(new Error())
    const handleSpy = jest.spyOn(errorHandlerStub, 'handle')
    await sut.handle(makeParams())

    expect(handleSpy).toHaveBeenCalledWith(new Error())
  })

  test('Should return notFound if update doesnt returns affected row quantity', async () => {
    const { sut, updatePermissionGroupStub } = makeSut()
    jest.spyOn(updatePermissionGroupStub, 'update').mockResolvedValue(0)
    const response = await sut.handle(makeParams())
    expect(response).toEqual(notFound())
  })

  test('Should return noContent on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(makeParams())

    expect(response).toEqual(noContent())
  })
})
