import { Validation } from '@/presentation/protocols/validations'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddPermissionGroupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
