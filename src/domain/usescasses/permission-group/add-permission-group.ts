import { PermissionModel } from '@/domain/models/permission'
import { PermissionGroupModel } from '@/domain/models/permission-group'

export interface AddPermissionGroupParams {
  name: string
  permission: PermissionModel[]
}

export interface AddPermissionGroup {
  add: (partner: AddPermissionGroupParams) => Promise<PermissionGroupModel>
}
