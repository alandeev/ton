import { RemovePermissionGroupRepository } from '@/data/protocols/db/permission-group/remove-permission-group-repository'
import { RemovePermissionGroup } from '@/domain/usescasses/permission-group/remove-permission-group'

export class DbRemovePermissionGroup implements RemovePermissionGroup {
  constructor (
    private readonly removePermissionGroupRepository: RemovePermissionGroupRepository
  ) {}

  async remove (partnerContactId: string): Promise<number> {
    const affected = await this.removePermissionGroupRepository.remove(partnerContactId)

    return affected
  }
}
