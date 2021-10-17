import { AddPermissionGroupRepository } from '@/data/protocols/db/permission-group/add-permission-group-repository'
import { PermissionGroupModel } from '@/domain/models/permission-group'
import { AddPermissionGroup, AddPermissionGroupParams } from '@/domain/usescasses/permission-group/add-permission-group'

export class DbAddPermissionGroup implements AddPermissionGroup {
  constructor (
    private readonly addPermissionGroupRepository: AddPermissionGroupRepository
  ) {}

  async add (partnerContactData: AddPermissionGroupParams): Promise<PermissionGroupModel> {
    const partnerContact = await this.addPermissionGroupRepository.add(partnerContactData)
    return partnerContact
  }
}
