import { BaseEntityModel } from '@/domain/models/entity-base'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm'

@Entity('entity')
export class EntityBase implements BaseEntityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => EntityBase, { cascade: true })
  @JoinColumn({ name: 'entity_id', referencedColumnName: 'id' })
  entity: EntityBase

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
