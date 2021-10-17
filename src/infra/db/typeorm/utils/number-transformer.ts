import { ValueTransformer } from 'typeorm'

export const numberTransformer = (): ValueTransformer => ({
  to: (value: string) => value,
  from: (value: number): number => (value) ? Number(value) : value
})
