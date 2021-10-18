import { FindAmountAccessController } from '@/presentation/controllers/accesss/find-amount-access-controller'
import { Controller } from '@/presentation/protocols'
import { ErroHandlerFactory } from '../../erro/error-handler-factory'
import { makeDbFindAmountAccess } from '../../usecases/access/db-find-amount-access-factory'

export const makeFindAmountAccessController = (): Controller => {
  const erroHandler = new ErroHandlerFactory()
  const accountController = new FindAmountAccessController(makeDbFindAmountAccess(), erroHandler)
  return accountController
}
