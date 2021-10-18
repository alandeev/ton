import { FindPermissionGroupByPageRepository } from '@/data/protocols/db/permission-group/find-permission-group-by-page-repository'
import { DbFindPermissionGroupByPage } from '@/data/usescases/permission-group/db-find-permission-group-by-page'
import { FindPermissionGroupByPage } from '@/domain/usescasses/permission-group/find-permission-group-by-page'
import { makeGetPermissionGroupsByPageRepository } from '@/tests/unitary/data/mocks/mock-permission-group'
import { makePermissionGroupByPage } from '@/tests/unitary/domain/mocks/auth/permission-group/permission-group-mocks'
import MockDate from 'mockdate'

interface SutTypes {
  getPermissionGroupsByPageRepository: FindPermissionGroupByPageRepository
  sut: FindPermissionGroupByPage
}

const makeSut = (): SutTypes => {
  const getPermissionGroupsByPageRepository = makeGetPermissionGroupsByPageRepository()
  const sut = new DbFindPermissionGroupByPage(getPermissionGroupsByPageRepository)

  return {
    getPermissionGroupsByPageRepository,
    sut
  }
}

describe('DbFindAllDebitsByBaseDate', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  test('Should call findAllById repository with correct values', async () => {
    const { sut, getPermissionGroupsByPageRepository } = makeSut()
    const findSpy = jest.spyOn(getPermissionGroupsByPageRepository, 'findByPage')
    await sut.findByPage(0, 0, undefined)
    expect(findSpy).toHaveBeenCalledWith(0, 0, undefined)
  })

  test('Should call findAllById repository with correct filter value', async () => {
    const { sut, getPermissionGroupsByPageRepository } = makeSut()
    const findSpy = jest.spyOn(getPermissionGroupsByPageRepository, 'findByPage')
    await sut.findByPage(0, 0)
    expect(findSpy).toHaveBeenCalledWith(0, 0, undefined)
  })

  test('Should return a creditor array on success', async () => {
    const { sut } = makeSut()
    const repsponse = await sut.findByPage(0, 0)
    expect(repsponse).toEqual(makePermissionGroupByPage())
  })
})
