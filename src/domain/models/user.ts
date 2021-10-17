import { AccountModel } from './account'
import { BaseEntityModel, EntityModel } from './entity-base'

export interface UserModel extends EntityModel {
  id: string
  password: string
  entity: BaseEntityModel
  account: AccountModel
  created_at: Date
  updated_at?: Date
}
