import { PermissionGroupModel } from '@/domain/models/permission-group'
import { AddPermissionGroup, AddPermissionGroupParams } from '@/domain/usescasses/permission-group/add-permission-group'
import { FindPermissionGroupById } from '@/domain/usescasses/permission-group/find-permission-group-by-id'
import { FindPermissionGroupByPage, PermissionGroupPageResponse } from '@/domain/usescasses/permission-group/find-permission-group-by-page'
import { RemovePermissionGroup } from '@/domain/usescasses/permission-group/remove-permission-group'
import { UpdatePermissionGroup, UpdatePermissionGroupParams } from '@/domain/usescasses/permission-group/update-permission-group'
import { makePermissionGroupByPage, makePermissionGroupModel } from '@/tests/unitary/domain/mocks/auth/permission-group/permission-group-mocks'

export const makeDbAddPermissionGroup = (): AddPermissionGroup => {
  class AddPermissionGroupStub implements AddPermissionGroup {
    async add (permissionGroup: AddPermissionGroupParams): Promise<PermissionGroupModel> {
      return await new Promise(resolve => resolve(makePermissionGroupModel()))
    }
  }
  return new AddPermissionGroupStub()
}

export const makeDbRemovePermissionGroup = (): RemovePermissionGroup => {
  class RemovePermissionGroupStub implements RemovePermissionGroup {
    async remove (idPermissionGroup: string): Promise<number> {
      return await new Promise(resolve => resolve(1))
    }
  }
  return new RemovePermissionGroupStub()
}

export const makeDbFindPermissionGroupByIdStub = (): FindPermissionGroupById => {
  class FindPermissionGroupByIdStub implements FindPermissionGroupById {
    async findById (idPermissionGroup: string): Promise<PermissionGroupModel> {
      return await new Promise(resolve => resolve(makePermissionGroupModel()))
    }
  }
  return new FindPermissionGroupByIdStub()
}

export const makeDbFindPermissionGroupByPageStub = (): FindPermissionGroupByPage => {
  class FindPermissionGroupByPageStub implements FindPermissionGroupByPage {
    async findByPage (page: number, offset: number, filter?: string, orderBy?: string): Promise<PermissionGroupPageResponse> {
      return await new Promise(resolve => resolve(makePermissionGroupByPage()))
    }
  }
  return new FindPermissionGroupByPageStub()
}

export const makeDbUpdatePermissionGroup = (): UpdatePermissionGroup => {
  class DbUpdatePermissionGroupStub implements UpdatePermissionGroup {
    async update (permissionGroupId: string, permissionGroupData: UpdatePermissionGroupParams): Promise<number> {
      return await new Promise(resolve => resolve(1))
    }
  }
  return new DbUpdatePermissionGroupStub()
}
