import { AddPermissionGroup } from '@/domain/usescasses/permission-group/add-permission-group'
import { DbAddPermissionGroup } from '@/data/usescases/permission-group/db-add-permission-group'
import { PermissionGroupRepository } from '@/infra/db/typeorm/modules/permission-group/permission-group-repository'

export const makeDbAddPermissionGroup = (): AddPermissionGroup => {
  const contactRepository = new PermissionGroupRepository()
  return new DbAddPermissionGroup(contactRepository)
}
