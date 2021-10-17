import { EnumUserRole } from '@/domain/enums/enum-user-role'
import { PermissionGroupModel } from '@/domain/models/permission-group'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ObjectLiteral,
  Like
} from 'typeorm'
import { enumTransformer } from '../../utils'
import { ILike } from '../../utils/custom-find-operators'
import { PermissionEntity } from '../permission/permission-entity'

const role = Object.values(EnumUserRole)

@Entity('permission_group')
export class PermissionGroupEntity implements PermissionGroupModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({
    transformer: enumTransformer(role)
  })
  role: number

  @OneToMany(() => PermissionEntity, permission => permission.permission_group, { cascade: true })
  permission: PermissionEntity[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  public static mapFilter (): ObjectLiteral {
    return {
      name: (value: string) => ILike(value),
      role: (value: number) => Like(value)
    }
  }

  public static mapOrderBy (): ObjectLiteral {
    return {
      name: (property: string) => `permission_group.${property}`
    }
  }
}
