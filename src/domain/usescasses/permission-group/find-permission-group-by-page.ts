import { PermissionGroupModel } from '@/domain/models/permission-group'

export interface PermissionGroupPageResponse {
  data: PermissionGroupModel[]
  total: number
}

export interface FindPermissionGroupByPage {
  findByPage: (page: number, offset: number, filter?: string, orderBy?: string) => Promise<PermissionGroupPageResponse>
}
