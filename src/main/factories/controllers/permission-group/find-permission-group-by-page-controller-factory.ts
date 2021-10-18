import { Controller } from '@/presentation/protocols'
import { FindPermissionGroupByPageController } from '@/presentation/controllers/permission-group/find-permission-group-by-page-controller'
import { makeDbFindPermissionGroupByPage } from '../../usecases/permission-group/db-find-permission-group-by-page-factory'
import { ErroHandlerFactory } from '../../erro/error-handler-factory'

export const makeFindPermissionGroupByPageController = (): Controller => {
  const erroHandler = new ErroHandlerFactory()
  const contactController = new FindPermissionGroupByPageController(makeDbFindPermissionGroupByPage(), erroHandler)
  return contactController
}
