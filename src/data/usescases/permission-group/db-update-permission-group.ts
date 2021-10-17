import { UpdatePermissionGroupRepository } from '@/data/protocols/db/permission-group/update-permission-group-repository'
import { UpdatePermissionGroup, UpdatePermissionGroupParams } from '@/domain/usescasses/permission-group/update-permission-group'

export class DbUpdatePermissionGroup implements UpdatePermissionGroup {
  constructor (
    private readonly updatePermissionGroupRepository: UpdatePermissionGroupRepository
  ) {}

  async update (partnerContactId: string, partnerContactData: UpdatePermissionGroupParams): Promise<number> {
    const affected = await this.updatePermissionGroupRepository.update(partnerContactId, partnerContactData)
    return affected
  }
}
