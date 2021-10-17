import { PermissionGroupPageResponse } from '@/domain/usescasses/permission-group/find-permission-group-by-page'

export interface FindPermissionGroupByPageRepository {
  findByPage: (page: number, offset: number, filter?: string, orderBy?: string) => Promise<PermissionGroupPageResponse>
}
