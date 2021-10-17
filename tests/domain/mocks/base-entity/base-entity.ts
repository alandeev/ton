import { BaseEntityModel } from '@/domain/models/entity-base'

export const makeBaseEntity = (): BaseEntityModel => ({
  id: 'any_base_entity_id',
  created_at: new Date(),
  updated_at: new Date()
})
