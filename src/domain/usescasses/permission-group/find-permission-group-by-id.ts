import { PermissionGroupModel } from '@/domain/models/permission-group'

export interface FindPermissionGroupById {
  findById: (id: string) => Promise<PermissionGroupModel>
}
