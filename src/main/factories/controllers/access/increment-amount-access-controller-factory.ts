import { IncrementAmountAccessController } from '@/presentation/controllers/accesss/increment-amount-acess-controller'
import { Controller } from '@/presentation/protocols'
import { ErroHandlerFactory } from '../../erro/error-handler-factory'
import { makeDbIncrementAmountAccess } from '../../usecases/access/db-increment-amout-access-factory'

export const makeIncrementAmountAccessController = (): Controller => {
  const erroHandler = new ErroHandlerFactory()
  const accountController = new IncrementAmountAccessController(makeDbIncrementAmountAccess(), erroHandler)
  return accountController
}
