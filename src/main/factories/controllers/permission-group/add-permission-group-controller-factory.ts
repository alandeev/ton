import { AddPermissionGroupController } from '@/presentation/controllers/permission-group/add-permission-group/add-permission-group-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddPermissionGroupValidation } from './permission-group-validation/add-permission-group-validation-factory'
import { makeDbAddPermissionGroup } from '@/main/factories/usecases/permission-group/db-add-permission-group-factory'
import { ErroHandlerFactory } from '../../erro/error-handler-factory'

export const makeAddPermissionGroupController = (): Controller => {
  const erroHandler = new ErroHandlerFactory()
  const contactController = new AddPermissionGroupController(makeDbAddPermissionGroup(), makeAddPermissionGroupValidation(), erroHandler)
  return contactController
}
