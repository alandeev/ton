import { EnumUserRole } from '@/domain/enums/enum-user-role'
import { AddAccountParams } from '@/domain/usescasses/account/add-account'

export const makeAccount = (): AddAccountParams => ({
  name: 'xxxxxx',
  email: 'any_email2@email.com',
  about: 'any_about',
  phone: '61988776655',
  password: 'any_password',
  permission_group: {
    id: 'any_id'
  },
  entity: {
    id: 'any_id'
  },
  role: EnumUserRole.INTERNO.value
})
