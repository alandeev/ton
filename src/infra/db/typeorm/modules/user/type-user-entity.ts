import { TypeUserModel } from '@/domain/models/type-user'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('type_user')
export class TypeUserEntity implements TypeUserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
