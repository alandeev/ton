import { badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols'
import { HttpRequest, HttpResponse, Controller, AddAccount, Validation } from './account-controller-protocols'

export class AddAccountController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly errorHandler: ErrorHandler
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        name,
        documenty,
        email,
        phone,
        password,
        permission_group: permissionGroup,
        role,
        entity,
        about
      } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const entityUserJWT = { id: httpRequest.accountEntityId }

      const entityUser = entity || entityUserJWT

      const account = await this.addAccount.add({
        role,
        name,
        about,
        entity: entityUser,
        documenty,
        permission_group: permissionGroup,
        email,
        phone,
        password
      })

      return ok(account)
    } catch (error) {
      return this.errorHandler.handle(error)
    }
  }
}
