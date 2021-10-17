import { Controller, ErrorHandler, HttpRequest } from '@/presentation/protocols'
import { makeErrorHandler, makeValidation } from '@/tests/presentation/mocks/controller-helpers'
import { noContent } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { RemovePermissionGroup } from '@/domain/usescasses/permission-group/remove-permission-group'
import { makeRemovePermissionGroupRepositoryStub } from '@/tests/data/mocks/mock-permission-group'
import { RemovePermissionGroupController } from '@/presentation/controllers/permission-group/remove-permission-group-controller'

interface SutTypes {
  removePermissionGroupStub: RemovePermissionGroup
  errorHandlerStub: ErrorHandler
  sut: Controller
}

const makeSut = (): SutTypes => {
  const errorHandlerStub = makeErrorHandler()
  const removePermissionGroupStub = makeRemovePermissionGroupRepositoryStub()
  const validationStub = makeValidation()
  const sut = new RemovePermissionGroupController(removePermissionGroupStub, validationStub, errorHandlerStub)

  return {
    removePermissionGroupStub,
    errorHandlerStub,
    sut
  }
}

const makeParams = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

describe('RemovePermissionGroupController', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('Should call removePermissionGroup with correct param', async () => {
    const { sut, removePermissionGroupStub } = makeSut()
    const removeSpy = jest.spyOn(removePermissionGroupStub, 'remove')
    await sut.handle(makeParams())
    expect(removeSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeParams())
    expect(response).toEqual(noContent())
  })

  test('Should call errorHandler if delete throws', async () => {
    const { sut,removePermissionGroupStub, errorHandlerStub } = makeSut()
    jest.spyOn(removePermissionGroupStub, 'remove').mockRejectedValueOnce(new Error())
    const handleSpy = jest.spyOn(errorHandlerStub, 'handle')

    await sut.handle(makeParams())
    expect(handleSpy).toHaveBeenCalled()
  })
})
