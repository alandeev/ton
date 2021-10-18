import { FindPermissionGroupByIdRepository } from '@/data/protocols/db/permission-group/find-permission-group-by-id-repository'
import { DbFindPermissionGroupById } from '@/data/usescases/permission-group/db-find-permission-group-by-id'
import { FindPermissionGroupById } from '@/domain/usescasses/permission-group/find-permission-group-by-id'
import { makePermissionGroupByIdRepository } from '@/tests/unitary/data/mocks/mock-permission-group'
import { makePermissionGroupModel } from '@/tests/unitary/domain/mocks/auth/permission-group/permission-group-mocks'
import MockDate from 'mockdate'

interface SutTypes {
  sut: FindPermissionGroupById
  getPermissionGroupByIdRepositoryStub: FindPermissionGroupByIdRepository
}

const makeSut = (): SutTypes => {
  const getPermissionGroupByIdRepositoryStub = makePermissionGroupByIdRepository()
  const sut = new DbFindPermissionGroupById(getPermissionGroupByIdRepositoryStub)

  return {
    sut,
    getPermissionGroupByIdRepositoryStub
  }
}

describe('DbGetPermissionGroupById', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  test('Should call getPermissionGroupRepository with correct values ', async () => {
    const { sut, getPermissionGroupByIdRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getPermissionGroupByIdRepositoryStub, 'findById')
    await sut.findById('any_id')
    expect(getSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if get getPermissionGroupByIdRepository throws', async () => {
    const { sut, getPermissionGroupByIdRepositoryStub } = makeSut()
    jest.spyOn(getPermissionGroupByIdRepositoryStub, 'findById').mockRejectedValueOnce(new Error())
    const promise = sut.findById('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a PermissionGroup list on success', async () => {
    const { sut } = makeSut()
    const proposal = await sut.findById('any_id')
    expect(proposal).toEqual(makePermissionGroupModel())
  })
})
