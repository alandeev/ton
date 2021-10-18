
import { EnumUserRole } from '@/domain/enums/enum-user-role'
import { AccountResponse, AddAccountsParams, AuthResponse } from '@/domain/usescasses/authentication'

export const makeLogin = (): AddAccountsParams => ({
  email: 'any_email',
  password: 'any_password'
})

export const makeLoginResponse = (): AccountResponse => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  accountRole: EnumUserRole.INTERNO.value
})

export const makeAuthResponse = (): AuthResponse => ({
  user: makeLoginResponse(),
  accessToken: 'any_token'
})
