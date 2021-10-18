import { Controller } from '@/presentation/protocols'
import { FindPermissionGroupByIdController } from '@/presentation/controllers/permission-group/find-permission-group-by-id-controller'
import { makeDbFindPermissionGroupById } from '../../usecases/permission-group/db-find-permission-group-by-id-factory'
import { ErroHandlerFactory } from '../../erro/error-handler-factory'

export const makeFindPermissionGroupByIdController = (): Controller => {
  const erroHandler = new ErroHandlerFactory()
  const contactController = new FindPermissionGroupByIdController(makeDbFindPermissionGroupById(), erroHandler)
  return contactController
}
