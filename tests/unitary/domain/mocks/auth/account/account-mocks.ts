import { EnumUserRole } from '@/domain/enums/enum-user-role'
import { AccountModel } from '@/domain/models/account'
import { makePermissionGroupModel } from '../permission-group/permission-group-mocks'

export const makeAccountModel = (): AccountModel => ({
  id: 'any_account_model',
  role: EnumUserRole.INTERNO.value,
  name: 'any_account_name',
  documenty: 'any_account_documenty',
  email: 'any_account_email',
  phone: 'any_account_phone',
  password: 'any_account_password',
  enabled: false,
  permission_group: makePermissionGroupModel(),
  first_login: true,
  created_at: new Date(),
  updated_at: new Date()
})
