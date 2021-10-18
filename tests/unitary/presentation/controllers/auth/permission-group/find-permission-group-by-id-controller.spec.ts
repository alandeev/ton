import { Controller, ErrorHandler, HttpRequest } from '@/presentation/protocols'
import { makeErrorHandler } from '@/tests/unitary/presentation/mocks/controller-helpers'
import { ok } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { FindPermissionGroupById } from '@/domain/usescasses/permission-group/find-permission-group-by-id'
import { makePermissionGroupByIdRepository } from '@/tests/unitary/data/mocks/mock-permission-group'
import { FindPermissionGroupByIdController } from '@/presentation/controllers/permission-group/find-permission-group-by-id-controller'
import { makePermissionGroupModel } from '@/tests/unitary/domain/mocks/auth/permission-group/permission-group-mocks'

interface SutTypes {
  errorHandlerStub: ErrorHandler
  findPermissionGroupByIdStub: FindPermissionGroupById
  sut: Controller
}

const makeSut = (): SutTypes => {
  const errorHandlerStub = makeErrorHandler()
  const findPermissionGroupByIdStub = makePermissionGroupByIdRepository()
  const sut = new FindPermissionGroupByIdController(findPermissionGroupByIdStub, errorHandlerStub)

  return {
    findPermissionGroupByIdStub,
    errorHandlerStub,
    sut
  }
}

const makeParams = (): HttpRequest => ({
  params: { id: 'any_id' }
})

describe('FindPermissionGroupById', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('Should call findById with correct param', async () => {
    const { sut, findPermissionGroupByIdStub } = makeSut()
    const findSpy = jest.spyOn(findPermissionGroupByIdStub, 'findById')

    await sut.handle(makeParams())
    expect(findSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should call errorHandler if controller throws', async () => {
    const { sut, findPermissionGroupByIdStub, errorHandlerStub } = makeSut()
    jest.spyOn(findPermissionGroupByIdStub, 'findById').mockRejectedValue(new Error())
    const handleSpy = jest.spyOn(errorHandlerStub, 'handle')

    await sut.handle(makeParams())
    expect(handleSpy).toHaveBeenCalledWith(new Error())
  })

  test('Should return ok with company debit on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(makeParams())
    expect(response).toEqual(ok(makePermissionGroupModel()))
  })
})
