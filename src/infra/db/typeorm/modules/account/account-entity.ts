import { EnumUserRole } from '@/domain/enums/enum-user-role'
import { AccountModel } from '@/domain/models/account'
import { ObjectLiteral } from '@/shared/types/object-literal'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Like
} from 'typeorm'
import { enumTransformer } from '../../utils'
import { ILike } from '../../utils/custom-find-operators'
import { EntityBase } from '../entity/base-entity'
import { PermissionGroupEntity } from '../permission-group/permission-group-entity'

const role = Object.values(EnumUserRole)

@Entity('account')
export class AccountEntity implements AccountModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => EntityBase, { eager: true })
  @JoinColumn({ name: 'entity_id', referencedColumnName: 'id' })
  entity: EntityBase

  @ManyToOne(() => PermissionGroupEntity, { eager: true })
  @JoinColumn({ name: 'permission_group_id', referencedColumnName: 'id' })
  permission_group: PermissionGroupEntity

  @Column()
  name: string

  @Column()
  about: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  documenty?: string

  @Column({
    transformer: enumTransformer(role)
  })
  role: number

  @Column()
  password: string

  @Column()
  first_login: boolean

  @Column()
  enabled: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  public static mapFilter (): ObjectLiteral {
    return {
      name: (value: string) => ILike(value),
      email: (value: string) => ILike(value),
      about: (value: string) => ILike(value),
      phone: (value: string) => Like(value),
      documenty: (value: string) => Like(value),
      enabled: (value: boolean) => value,
      entity: (value: number) => value
    }
  }

  public static mapOrderBy (): ObjectLiteral {
    return {
      name: (property: string) => `account.${property}`,
      phone: (property: string) => `account.${property}`,
      email: (property: string) => `account.${property}`,
      about: (property: string) => `account.${property}`,
      created_at: (property: string) => `account.${property}`,
      updated_at: (property: string) => `account.${property}`
    }
  }
}
