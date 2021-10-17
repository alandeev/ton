import { PermissionGroupRepository } from '@/infra/db/typeorm/modules/permission-group/permission-group-repository'
import { FindPermissionGroupById } from '@/domain/usescasses/permission-group/find-permission-group-by-id'
import { DbFindPermissionGroupById } from '@/data/usescases/permission-group/db-find-permission-group-by-id'

export const makeDbFindPermissionGroupById = (): FindPermissionGroupById => {
  const contactRepository = new PermissionGroupRepository()
  return new DbFindPermissionGroupById(contactRepository)
}
