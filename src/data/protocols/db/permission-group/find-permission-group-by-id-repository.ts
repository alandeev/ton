import { PermissionGroupModel } from '@/domain/models/permission-group'

export interface FindPermissionGroupByIdRepository {
  findById: (permissionGroupid: string) => Promise<PermissionGroupModel>
}
