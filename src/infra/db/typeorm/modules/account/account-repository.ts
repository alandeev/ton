
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { FindAccountByIdRepository } from '@/data/protocols/db/account/find-account-by-id-repository'
import { RemoveAccountRepository } from '@/data/protocols/db/account/remove-account-repository'
import { UpdateAccountRepository } from '@/data/protocols/db/account/update-account-repository'
import { AccountModel, AccountModelResponse, FindAccountByEmailRepository } from '@/data/usescases/authentication/db-authentication-protocols'
import { AddAccountParams } from '@/domain/usescasses/account/add-account'
import { UpdateAccountParams } from '@/domain/usescasses/account/update-account'
import { getRepository } from 'typeorm'
import { AccountEntity } from './account-entity'

export class AccountRepository implements AddAccountRepository, FindAccountByEmailRepository, FindAccountByIdRepository, UpdateAccountRepository, RemoveAccountRepository {
  async add (accountData: AddAccountParams): Promise<AccountModelResponse> {
    const accountEntity = getRepository(AccountEntity)
    const account = accountEntity.create(accountData)

    return await accountEntity.save(account)
  }

  async update (accountId: string, accountData: UpdateAccountParams): Promise<number> {
    const accountEntity = getRepository(AccountEntity)
    const respondeDb = await accountEntity.update(accountId, accountData)

    return respondeDb.affected
  }

  async remove (accountId: string): Promise<number> {
    const accountEntity = getRepository(AccountEntity)
    const dbResponse = await accountEntity.delete(accountId)

    return dbResponse.affected
  }

  async findByEmail (email: string): Promise<AccountModel> {
    const accountEntity = getRepository(AccountEntity)

    const account = await accountEntity
      .createQueryBuilder('account')
      .select([
        'account.id',
        'account.name',
        'account.email',
        'account.about',
        'account.role',
        'account.password'
      ])
      .where('account.email = :email', { email: email })
      .getOne()

    return account
  }

  async findById (id: string): Promise<AccountModelResponse> {
    const accountEntity = getRepository(AccountEntity)
    const account = await accountEntity
      .createQueryBuilder('account')
      .select([
        'account.id',
        'account.name',
        'account.about',
        'account.documenty',
        'account.email',
        'account.phone',
        'account.first_login',
        'account.enabled',
        'account.created_at',
        'account.updated_at',
        'account.role'
      ])
      .leftJoinAndSelect('account.entity', 'entity')
      .innerJoinAndSelect('account.permission_group', 'permission_group')
      .where('account.id = :id', { id: id })
      .getOne()

    return account
  }

  async findByPermission (id: string, target: string, action: string): Promise<AccountModelResponse> {
    const accountEntity = getRepository(AccountEntity)
    const account = await accountEntity
      .createQueryBuilder('account')
      .innerJoinAndSelect('account.entity', 'entity')
      .innerJoin('account.permission_group', 'permission_group')
      .leftJoin('permission_group.permission', 'permission')
      .where('account.id = :id', { id: id })
      .andWhere('permission.subject = :target', { target: target })
      .andWhere('permission.action = :action', { action: action })
      .andWhere('account.enabled = true')
      .getOne()

    return account
  }
}
