import { PermissionGroupPageResponse, FindPermissionGroupByPage } from '@/domain/usescasses/permission-group/find-permission-group-by-page'
import { FindPermissionGroupByPageRepository } from '@/data/protocols/db/permission-group/find-permission-group-by-page-repository'

export class DbFindPermissionGroupByPage implements FindPermissionGroupByPage {
  constructor (
    private readonly findPermissionGroupByPageRepository: FindPermissionGroupByPageRepository
  ) {}

  async findByPage (page: number, offset: number, filter?: string): Promise<PermissionGroupPageResponse> {
    const partnerContactsPageResponse = await this.findPermissionGroupByPageRepository.findByPage(page, offset, filter)

    return partnerContactsPageResponse
  }
}
