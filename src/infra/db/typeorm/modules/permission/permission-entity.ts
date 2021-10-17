import { PermissionModel } from '@/domain/models/permission'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { PermissionGroupEntity } from '../permission-group/permission-group-entity'

@Entity('permission')
export class PermissionEntity implements PermissionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => PermissionGroupEntity, { eager: true })
  @JoinColumn({ name: 'permission_group_id', referencedColumnName: 'id' })
  permission_group: PermissionGroupEntity

  @Column()
  action: string

  @Column()
  subject: string

  @Column()
  conditions: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
