import { PermissionModel } from '@/domain/models/permission'
import { PermissionGroupModel } from '@/domain/models/permission-group'
import { PermissionGroupPageResponse } from '@/domain/usescasses/permission-group/find-permission-group-by-page'

export const makePermissionGroupModel = (): PermissionGroupModel => ({
  id: 'any_permission_group_model',
  name: 'any_permission_group_name'
})

export const makePermissionGroupByPage = (): PermissionGroupPageResponse => ({
  data: [{
    id: 'any_permission_group_model',
    name: 'any_permission_group_name'
  }],
  total: 1
})

export const makePermissionModel = (): PermissionModel => ({
  id: 'any_permission_model',
  permission_group: makePermissionGroupModel(),
  action: 'any_permission_model',
  subject: 'any_permission_model',
  conditions: 'any_permission_model',
  created_at: new Date(),
  updated_at: new Date()
})
