import { EnumObject } from '@/domain/enums/enum-object'
import { ValueTransformer } from 'typeorm'

export const enumTransformer = (enums: EnumObject[]): ValueTransformer => ({
  to: (enumerator: EnumObject) => (enumerator) ? enumerator.value : enumerator,
  from: (value: number): EnumObject => enums.find(item => item.value === value)
})

export const enumMultipleTransformer = (enums: EnumObject[]): ValueTransformer => ({
  to: (enumerator: EnumObject[]) => (enumerator) ? enumerator.map(enumObject => enumObject.value).join(',') : enumerator,
  from: (value: string): EnumObject[] => (value) ? value.split(',').map(value => enums.find(item => item.value === Number(value))) : null
})
