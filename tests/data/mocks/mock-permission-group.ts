import { PermissionGroupModel } from '@/domain/models/permission-group'
import { AddPermissionGroupParams } from '@/domain/usescasses/permission-group/add-permission-group'
import { PermissionGroupPageResponse } from '@/domain/usescasses/permission-group/find-permission-group-by-page'
import { UpdatePermissionGroupParams } from '@/domain/usescasses/permission-group/update-permission-group'
import { makePermissionGroupByPage, makePermissionGroupModel } from '@/tests/domain/mocks/auth/permission-group/permission-group-mocks'
import { AddPermissionGroupRepository } from '../protocols/db/permission-group/add-permission-group-repository'
import { FindPermissionGroupByIdRepository } from '../protocols/db/permission-group/find-permission-group-by-id-repository'
import { FindPermissionGroupByPageRepository } from '../protocols/db/permission-group/find-permission-group-by-page-repository'
import { RemovePermissionGroupRepository } from '../protocols/db/permission-group/remove-permission-group-repository'
import { UpdatePermissionGroupRepository } from '../protocols/db/permission-group/update-permission-group-repository'

export const makeAddPermissionGroupRepository = (): AddPermissionGroupRepository => {
  class AddPermissionGroupRepositoryStub implements AddPermissionGroupRepository {
    async add (permissionGroup: AddPermissionGroupParams): Promise<PermissionGroupModel> {
      return await new Promise(resolve => resolve(makePermissionGroupModel()))
    }
  }

  return new AddPermissionGroupRepositoryStub()
}

export const makeRemovePermissionGroupRepositoryStub = (): RemovePermissionGroupRepository => {
  class RemovePermissionGroupRepositoryStub implements RemovePermissionGroupRepository {
    async remove (permissionGroupId: string): Promise<number> {
      return await new Promise(resolve => resolve(1))
    }
  }
  return new RemovePermissionGroupRepositoryStub()
}

export const makePermissionGroupByIdRepository = (): FindPermissionGroupByIdRepository => {
  class PermissionGroupsByIdRepositoryStub implements FindPermissionGroupByIdRepository {
    async findById (idPermissionGroup: string): Promise<PermissionGroupModel> {
      return await new Promise(resolve => resolve(makePermissionGroupModel()))
    }
  }
  return new PermissionGroupsByIdRepositoryStub()
}

export const makeGetPermissionGroupsByPageRepository = (): FindPermissionGroupByPageRepository => {
  class GetPermissionGroupsByRepositoryStub implements FindPermissionGroupByPageRepository {
    async findByPage (page: number, offset: number, filter?: string, orderBy?: string): Promise<PermissionGroupPageResponse> {
      return await new Promise(resolve => resolve(makePermissionGroupByPage()))
    }
  }
  return new GetPermissionGroupsByRepositoryStub()
}

export const makeUpdatePermissionGroupRepository = (): UpdatePermissionGroupRepository => {
  class UpdatePermissionGroupRepositoryStub implements UpdatePermissionGroupRepository {
    async update (permissionGroupId: string, permissionGroupData: UpdatePermissionGroupParams): Promise<number> {
      return await new Promise(resolve => resolve(1))
    }
  }

  return new UpdatePermissionGroupRepositoryStub()
}
