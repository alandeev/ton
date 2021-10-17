import { PermissionGroupModel } from '@/domain/models/permission-group'

export interface FindPermissionGroupByRoleRepository {
  findByRole: (role: number) => Promise<PermissionGroupModel>
}
