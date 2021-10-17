import { EntityModel } from './entity-base'
export interface AccountModel extends EntityModel {
  id?: string
  role: number
  name: string
  about?: string
  documenty?: string
  email: string
  phone: string
  password: string
  permission_group: { id: string }
  first_login?: boolean
  enabled?: boolean
  created_at?: Date
  updated_at?: Date
}

export type AccountModelResponse = Omit<AccountModel, 'password'>
