import { PermissionModel } from '@/domain/models/permission'

export interface UpdatePermissionGroupParams {
  name: string
  permission: PermissionModel[]
}

export interface UpdatePermissionGroup {
  update: (permissionGroupId: string, permissionGroup: UpdatePermissionGroupParams) => Promise<number>
}
