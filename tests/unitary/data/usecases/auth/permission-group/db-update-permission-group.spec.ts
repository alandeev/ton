import { UpdatePermissionGroupRepository } from '@/data/protocols/db/permission-group/update-permission-group-repository'
import { DbUpdatePermissionGroup } from '@/data/usescases/permission-group/db-update-permission-group'
import { UpdatePermissionGroup, UpdatePermissionGroupParams } from '@/domain/usescasses/permission-group/update-permission-group'
import { makeUpdatePermissionGroupRepository } from '@/tests/unitary/data/mocks/mock-permission-group'
import { makePermissionModel } from '@/tests/unitary/domain/mocks/auth/permission-group/permission-group-mocks'

interface SutTypes {
  updatePermissionGroupRepositoryStub: UpdatePermissionGroupRepository
  sut: UpdatePermissionGroup
}

const makeSut = (): SutTypes => {
  const updatePermissionGroupRepositoryStub = makeUpdatePermissionGroupRepository()
  const sut = new DbUpdatePermissionGroup(updatePermissionGroupRepositoryStub)

  return {
    updatePermissionGroupRepositoryStub,
    sut
  }
}

const makeParams = (): UpdatePermissionGroupParams => ({
  name: 'any_name',
  permission: [makePermissionModel()]
})

describe('DbUpdatePermissionGroupSpec', () => {
  test('Should call update repository with correct values', async () => {
    const { sut, updatePermissionGroupRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updatePermissionGroupRepositoryStub, 'update')
    const params = makeParams()
    await sut.update('any_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_id', params)
  })

  test('Should return the affected rows quantity on success', async () => {
    const { sut } = makeSut()
    const response = await sut.update('any_id', makeParams())

    expect(response).toEqual(1)
  })

  test('Should throw if repository throws', async () => {
    const { sut, updatePermissionGroupRepositoryStub } = makeSut()
    jest.spyOn(updatePermissionGroupRepositoryStub, 'update').mockRejectedValue(new Error())
    const promise = sut.update('any_id', makeParams())

    await expect(promise).rejects.toThrow(new Error())
  })
})
