import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddAccountController } from '../factories/controllers/account/add-account-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'
import { auth } from '@/main/middlewares'
import { makeFindPermissionGroupByPageController } from '../factories/controllers/permission-group/find-permission-group-by-page-controller-factory'
import { makeFindPermissionGroupByIdController } from '../factories/controllers/permission-group/find-permission-group-by-id-controller-factory'
import { makeAddPermissionGroupController, makeRemovePermissionGroupController, makeUpdatePermissionGroupController } from '../factories/controllers/permission-group/permission-group-controller-protocols'
import { makeFindAccountByIdController } from '../factories/controllers/account/find-account-by-id-controller-factory'
import { makeRemoveAccountController, makeUpdateAccountController } from '../factories/controllers/account/account-controller-protocols'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))

  router.post('/account', auth('account', 'create'), adaptRoute(makeAddAccountController()))

  router.get('/account/:id', auth('account', 'read'), adaptRoute(makeFindAccountByIdController()))
  router.put('/account/:id', auth('account', 'update'), adaptRoute(makeUpdateAccountController()))
  router.delete('/account/:id', auth('account', 'delete'), adaptRoute(makeRemoveAccountController()))

  router.get('/permission-group/:id', auth('account', 'read'), adaptRoute(makeFindPermissionGroupByIdController()))
  router.post('/permission-group', auth('account', 'create'), adaptRoute(makeAddPermissionGroupController()))
  router.put('/permission-group/:id', auth('account', 'update'), adaptRoute(makeUpdatePermissionGroupController()))
  router.delete('/permission-group/:id', auth('account', 'delete'), adaptRoute(makeRemovePermissionGroupController()))

  router.get('/role/:role/permission-group', auth('account', 'read'), adaptRoute(makeFindPermissionGroupByPageController()))
}
