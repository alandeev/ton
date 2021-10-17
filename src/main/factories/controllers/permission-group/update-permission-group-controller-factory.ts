import { UpdatePermissionGroupController } from '@/presentation/controllers/permission-group/update-permission-group/update-permission-group-controller'
import { Controller } from '@/presentation/protocols'
import { makeUpdatePermissionGroupValidation } from './permission-group-validation/update-permission-group-validation-factory'
import { makeDbUpdatePermissionGroup } from '@/main/factories/usecases/permission-group/db-update-permission-group-factory'
import { ErroHandlerFactory } from '../../erro/error-handler-factory'

export const makeUpdatePermissionGroupController = (): Controller => {
  const erroHandler = new ErroHandlerFactory()
  const contactController = new UpdatePermissionGroupController(makeDbUpdatePermissionGroup(), makeUpdatePermissionGroupValidation(), erroHandler)
  return contactController
}
