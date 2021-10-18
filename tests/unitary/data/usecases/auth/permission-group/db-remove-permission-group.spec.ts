import { RemovePermissionGroupRepository } from '@/data/protocols/db/permission-group/remove-permission-group-repository'
import { DbRemovePermissionGroup } from '@/data/usescases/permission-group/db-remove-permission-group'
import { RemovePermissionGroup } from '@/domain/usescasses/permission-group/remove-permission-group'
import { makeRemovePermissionGroupRepositoryStub } from '@/tests/unitary/data/mocks/mock-permission-group'

interface SutTypes {
  removePermissionGroupRepositoryStub: RemovePermissionGroupRepository
  sut: RemovePermissionGroup
}

const makeSut = (): SutTypes => {
  const removePermissionGroupRepositoryStub = makeRemovePermissionGroupRepositoryStub()

  const sut = new DbRemovePermissionGroup(removePermissionGroupRepositoryStub)

  return {
    removePermissionGroupRepositoryStub,
    sut
  }
}

describe('DbRemovePermissionGroup', () => {
  test("Should call remove repository with correct values if debit doesn't have a parent", async () => {
    const { sut, removePermissionGroupRepositoryStub } = makeSut()
    const removeSpy = jest.spyOn(removePermissionGroupRepositoryStub, 'remove')

    await sut.remove('any_id')
    expect(removeSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if repository throws', async () => {
    const { sut, removePermissionGroupRepositoryStub } = makeSut()
    jest.spyOn(removePermissionGroupRepositoryStub, 'remove').mockRejectedValue(new Error())

    const promise = sut.remove('any_id')
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return the affected row number on success', async () => {
    const { sut } = makeSut()
    const response = await sut.remove('any_id')
    expect(response).toEqual(1)
  })
})
