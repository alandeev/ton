import { Controller, ErrorHandler } from '@/presentation/protocols'
import { makeErrorHandler } from '@/tests/presentation/mocks/controller-helpers'
import { ok } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { FindAmountAccess } from '@/domain/usescasses/access/find-amount-access'
import { FindAmountAccessController } from '@/presentation/controllers/accesss/find-amount-access-controller'
import { makeDbFindAmountAccess } from '../../mocks/access/mock-access'

interface SutTypes {
  errorHandlerStub: ErrorHandler
  findFindAmountAccessStub: FindAmountAccess
  sut: Controller
}

const makeSut = (): SutTypes => {
  const errorHandlerStub = makeErrorHandler()
  const findFindAmountAccessStub = makeDbFindAmountAccess()
  const sut = new FindAmountAccessController(findFindAmountAccessStub, errorHandlerStub)

  return {
    findFindAmountAccessStub,
    errorHandlerStub,
    sut
  }
}

describe('FindAmountAccess', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('Should call findAmountAccess with correct param', async () => {
    const { sut, findFindAmountAccessStub } = makeSut()
    const findSpy = jest.spyOn(findFindAmountAccessStub, 'findAmount')

    await sut.handle()
    expect(findSpy).toHaveBeenCalledWith()
  })

  test('Should call errorHandler if controller throws', async () => {
    const { sut, findFindAmountAccessStub, errorHandlerStub } = makeSut()
    jest.spyOn(findFindAmountAccessStub, 'findAmount').mockRejectedValue(new Error())
    const handleSpy = jest.spyOn(errorHandlerStub, 'handle')

    await sut.handle()
    expect(handleSpy).toHaveBeenCalledWith(new Error())
  })

  test('Should return ok with findAmountAccess on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()
    expect(response).toEqual(ok(1))
  })
})
