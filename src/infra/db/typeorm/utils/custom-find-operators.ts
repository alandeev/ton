import { EnumObject } from '@/domain/enums/enum-object'
import { FindOperator, Raw } from 'typeorm'

export const ILike = (value: string): FindOperator<any> => Raw(alias => `${alias} ILIKE '%${value}%'`)
export const Enum = (value: string | number): EnumObject => ({ value, description: '' })
