import { EnumObject } from '@/domain/enums/enum-object'

export interface Encrypter {
  encrypt: (id: string, role: EnumObject | number) => Promise<string>
}
