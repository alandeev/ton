import { RemovePermissionGroup } from '@/domain/usescasses/permission-group/remove-permission-group'
import { DbRemovePermissionGroup } from '@/data/usescases/permission-group/db-remove-permission-group'
import { PermissionGroupRepository } from '@/infra/db/typeorm/modules/permission-group/permission-group-repository'

export const makeDbRemovePermissionGroup = (): RemovePermissionGroup => {
  const contactRepository = new PermissionGroupRepository()
  return new DbRemovePermissionGroup(contactRepository)
}
