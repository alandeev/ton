import { PermissionGroupModel } from '@/domain/models/permission-group'
import { AddPermissionGroupParams } from '@/domain/usescasses/permission-group/add-permission-group'

export interface AddPermissionGroupRepository {
  add: (permissionGroup: AddPermissionGroupParams) => Promise<PermissionGroupModel>
}
