export interface BaseEntityModel {
  id?: string
  entity?: BaseEntityModel
  created_at?: Date
  updated_at?: Date
}

export interface EntityModel {
  entity?: BaseEntityModel
}
