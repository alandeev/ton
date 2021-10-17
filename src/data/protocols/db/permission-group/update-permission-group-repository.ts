import { UpdatePermissionGroupParams } from '@/domain/usescasses/permission-group/update-permission-group'

export interface UpdatePermissionGroupRepository {
  update: (permissionGroupId: string, permissionGroupData: UpdatePermissionGroupParams) => Promise<number>
}
