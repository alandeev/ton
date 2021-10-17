import { FindPermissionGroupById } from '@/domain/usescasses/permission-group/find-permission-group-by-id'
import { FindPermissionGroupByIdRepository } from '@/data/protocols/db/permission-group/find-permission-group-by-id-repository'
import { PermissionGroupModel } from '@/domain/models/permission-group'

export class DbFindPermissionGroupById implements FindPermissionGroupById {
  constructor (
    private readonly findPermissionGroupByIdRepository: FindPermissionGroupByIdRepository
  ) {}

  async findById (id: string): Promise<PermissionGroupModel> {
    const partnerContactsIdResponse = await this.findPermissionGroupByIdRepository.findById(id)

    return partnerContactsIdResponse
  }
}
