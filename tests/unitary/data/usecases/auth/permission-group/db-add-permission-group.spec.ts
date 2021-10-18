import { AddPermissionGroupRepository } from '@/data/protocols/db/permission-group/add-permission-group-repository'
import { DbAddPermissionGroup } from '@/data/usescases/permission-group/db-add-permission-group'
import { AddPermissionGroup, AddPermissionGroupParams } from '@/domain/usescasses/permission-group/add-permission-group'
import { makeAddPermissionGroupRepository } from '@/tests/unitary/data/mocks/mock-permission-group'
import { makePermissionGroupModel, makePermissionModel } from '@/tests/unitary/domain/mocks/auth/permission-group/permission-group-mocks'
import MockDate from 'mockdate'

interface SutTypes {
  addPermissionGroupRepositoryStub: AddPermissionGroupRepository
  sut: AddPermissionGroup
}

const makeSut = (): SutTypes => {
  const addPermissionGroupRepositoryStub = makeAddPermissionGroupRepository()
  const sut = new DbAddPermissionGroup(addPermissionGroupRepositoryStub)

  return {
    addPermissionGroupRepositoryStub,
    sut
  }
}

const makeParams = (): AddPermissionGroupParams => ({
  name: 'any_name',
  permission: [makePermissionModel()]
})

describe('DbAddPermissionGroup', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  test('Should call add repository with correct values', async () => {
    const { sut, addPermissionGroupRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addPermissionGroupRepositoryStub, 'add')
    await sut.add(makeParams())

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      permission: [makePermissionModel()]
    })
  })

  test('Should return a creditor on success', async () => {
    const { sut } = makeSut()
    const response = await sut.add(makeParams())

    expect(response).toEqual(makePermissionGroupModel())
  })

  test('Should throw if repository throws', async () => {
    const { sut, addPermissionGroupRepositoryStub } = makeSut()

    jest.spyOn(addPermissionGroupRepositoryStub, 'add').mockRejectedValue(new Error())
    const promise = sut.add(makeParams())

    await expect(promise).rejects.toThrow(new Error())
  })
})
