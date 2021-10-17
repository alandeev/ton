
import { Controller, ErrorHandler, HttpRequest } from '@/presentation/protocols'
import { makeErrorHandler } from '@/tests/presentation/mocks/controller-helpers'
import { ok } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { FindPermissionGroupByPage } from '@/domain/usescasses/permission-group/find-permission-group-by-page'
import { makeGetPermissionGroupsByPageRepository } from '@/tests/data/mocks/mock-permission-group'
import { FindPermissionGroupByPageController } from '@/presentation/controllers/permission-group/find-permission-group-by-page-controller'
import { makePermissionGroupByPage } from '@/tests/domain/mocks/auth/permission-group/permission-group-mocks'
import { EnumUserRole } from '@/domain/enums/enum-user-role'

interface SutTypes {
  errorHandlerStub: ErrorHandler
  findPermissionGroupByPageStub: FindPermissionGroupByPage
  sut: Controller
}

const makeSut = (): SutTypes => {
  const errorHandlerStub = makeErrorHandler()
  const findPermissionGroupByPageStub = makeGetPermissionGroupsByPageRepository()
  const sut = new FindPermissionGroupByPageController(findPermissionGroupByPageStub, errorHandlerStub)

  return {
    findPermissionGroupByPageStub,
    errorHandlerStub,
    sut
  }
}

const makeParams = (): HttpRequest => ({
  query: {
    page: 0,
    limit: 0,
    filter: 'any_filter',
    orderBy: 'any_order'
  },
  params: {
    role: EnumUserRole.INTERNO.value
  }
})

describe('FindPermissionGroupByPageController', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  test('Should call find with correct values', async () => {
    const { sut, findPermissionGroupByPageStub } = makeSut()
    const findSpy = jest.spyOn(findPermissionGroupByPageStub, 'findByPage')
    await sut.handle(makeParams())

    expect(findSpy).toHaveBeenCalledWith(0, 0, 'role=1;any_filter', 'any_order')
  })

  test('Should call errorHandler if controller throws', async () => {
    const { sut, errorHandlerStub, findPermissionGroupByPageStub } = makeSut()

    jest.spyOn(findPermissionGroupByPageStub, 'findByPage').mockRejectedValue(new Error())
    const handleSpy = jest.spyOn(errorHandlerStub, 'handle')
    await sut.handle(makeParams())

    expect(handleSpy).toHaveBeenCalledWith(new Error())
  })

  test('Should return ok with correct response on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeParams())

    expect(response).toEqual(ok(makePermissionGroupByPage()))
  })
})
