import { PermissionGroupModel } from './permission-group'

export interface PermissionModel {
  id: string
  permission_group: PermissionGroupModel
  action: string
  subject: string
  conditions?: string
  created_at: Date
  updated_at?: Date
}
