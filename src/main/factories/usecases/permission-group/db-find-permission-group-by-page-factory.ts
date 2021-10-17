import { PermissionGroupRepository } from '@/infra/db/typeorm/modules/permission-group/permission-group-repository'
import { FindPermissionGroupByPage } from '@/domain/usescasses/permission-group/find-permission-group-by-page'
import { DbFindPermissionGroupByPage } from '@/data/usescases/permission-group/db-find-permission-group-by-page'

export const makeDbFindPermissionGroupByPage = (): FindPermissionGroupByPage => {
  const contactRepository = new PermissionGroupRepository()
  return new DbFindPermissionGroupByPage(contactRepository)
}
