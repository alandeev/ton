import { AddPermissionGroupRepository } from '@/data/protocols/db/permission-group/add-permission-group-repository'
import { FindPermissionGroupByIdRepository } from '@/data/protocols/db/permission-group/find-permission-group-by-id-repository'
import { FindPermissionGroupByPageRepository } from '@/data/protocols/db/permission-group/find-permission-group-by-page-repository'
import { RemovePermissionGroupRepository } from '@/data/protocols/db/permission-group/remove-permission-group-repository'
import { UpdatePermissionGroupRepository } from '@/data/protocols/db/permission-group/update-permission-group-repository'
import { PermissionGroupModel } from '@/domain/models/permission-group'
import { AddPermissionGroupParams } from '@/domain/usescasses/permission-group/add-permission-group'
import { PermissionGroupPageResponse } from '@/domain/usescasses/permission-group/find-permission-group-by-page'
import { UpdatePermissionGroupParams } from '@/domain/usescasses/permission-group/update-permission-group'
import { getConnection } from 'typeorm'
import { BaseRepository } from '../../utils/base-repository'
import { FilterParser } from '../../utils/filter-parser'
import { OrderByParser } from '../../utils/order-by-parser'
import { PermissionEntity } from '../permission/permission-entity'
import { PermissionGroupEntity } from './permission-group-entity'

export class PermissionGroupRepository implements AddPermissionGroupRepository, RemovePermissionGroupRepository, UpdatePermissionGroupRepository, FindPermissionGroupByPageRepository, FindPermissionGroupByIdRepository {
  async add (permissionGroupData: AddPermissionGroupParams): Promise<PermissionGroupModel> {
    const { name, permission } = permissionGroupData

    let permissionGroupSaved: any
    let permissionSaved: any
    await getConnection().transaction(async (manager): Promise<void> => {
      permissionGroupSaved = await manager.save(PermissionGroupEntity, { name })
      const permissionToSave = permission.map(permission => (permission.permission_group = permissionGroupSaved))
      permissionSaved = await manager.save(PermissionEntity, permissionToSave)
    })

    return await Promise.resolve({ ...permissionGroupSaved, permission: permissionSaved })
  }

  async update (permissionGroupId: string, permissionGroupData: UpdatePermissionGroupParams): Promise<number> {
    const permissionRepository = new BaseRepository(PermissionEntity)
    const { permission, ...permissionGroup } = permissionGroupData

    const permissionsFromDB = await permissionRepository.from('permission').where('permission.permission_group_id = :id', { id: permissionGroupId }).getMany()
    const permissionsIdsToRemove = permissionsFromDB.filter(p => (!permission.find(pdb => pdb.action === p.action && pdb.subject === p.subject))).map(p => p.id)
    const permissionsToInsert = permission.filter(p => {
      if (!permissionsFromDB.find(pdb => pdb.action === p.action && pdb.subject === p.subject)) {
        p.permission_group = { id: permissionGroupId, ...permissionGroup }
        return p
      }
    })

    let respondeDb: any

    await getConnection().transaction(async (manager): Promise<void> => {
      permissionsIdsToRemove.length > 0 && await manager.delete(PermissionEntity, permissionsIdsToRemove)
      await manager.save(PermissionEntity, permissionsToInsert)
      respondeDb = await manager.update(PermissionGroupEntity, permissionGroupId, permissionGroup)
    })

    return respondeDb.affected
  }

  async remove (permissionGroupId: string): Promise<number> {
    const permissionGroupEntity = new BaseRepository(PermissionGroupEntity)
    const dbResponse = await permissionGroupEntity.delete(permissionGroupId)

    return dbResponse.affected
  }

  async findById (id: string): Promise<PermissionGroupModel> {
    const permissionGroupEntity = new BaseRepository(PermissionGroupEntity)

    return await permissionGroupEntity.from('permission_group')
      .leftJoinAndSelect('permission_group.permission', 'permission')
      .where('permission_group.id = :id', { id })
      .getOne()
  }

  async findByRole (role: number): Promise<PermissionGroupModel> {
    const permissionGroupEntity = new BaseRepository(PermissionGroupEntity)

    return await permissionGroupEntity.from('permission_group')
      .where('permission_group.role = :role', { role })
      .getOne()
  }

  async findByPage (page = 0, limit = 10, filter = '', orderBy = 'name:asc'): Promise<PermissionGroupPageResponse> {
    const permissionGroupEntity = new BaseRepository(PermissionGroupEntity)
    const offset = page * limit

    const filterParsed = FilterParser.parseByMapFilter(filter, PermissionGroupEntity)
    const [sort, order] = OrderByParser.parse(orderBy, PermissionGroupEntity)

    const [permissionGroups, permissionGroupsCount] = await permissionGroupEntity
      .from('permission_group')
      .take(limit)
      .skip(offset)
      .where(filterParsed)
      .orderBy(sort, order)
      .getManyAndCount()

    return { data: permissionGroups, total: permissionGroupsCount }
  }
}
