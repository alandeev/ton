import { RemovePermissionGroupController } from '@/presentation/controllers/permission-group/remove-permission-group-controller'
import { Controller } from '@/presentation/protocols'
import { makeRemovePermissionGroupValidation } from './permission-group-validation/remove-permission-group-validation-factory'
import { makeDbRemovePermissionGroup } from '@/main/factories/usecases/permission-group/db-remove-permission-group-factory'
import { ErroHandlerFactory } from '../../erro/error-handler-factory'

export const makeRemovePermissionGroupController = (): Controller => {
  const erroHandler = new ErroHandlerFactory()
  const contactController = new RemovePermissionGroupController(makeDbRemovePermissionGroup(), makeRemovePermissionGroupValidation(), erroHandler)
  return contactController
}
