import { UpdatePermissionGroup } from '@/domain/usescasses/permission-group/update-permission-group'
import { DbUpdatePermissionGroup } from '@/data/usescases/permission-group/db-update-permission-group'
import { PermissionGroupRepository } from '@/infra/db/typeorm/modules/permission-group/permission-group-repository'

export const makeDbUpdatePermissionGroup = (): UpdatePermissionGroup => {
  const contactRepository = new PermissionGroupRepository()
  return new DbUpdatePermissionGroup(contactRepository)
}
