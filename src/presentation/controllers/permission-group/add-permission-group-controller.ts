import { badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols/error-handler'
import { HttpRequest, HttpResponse, Controller, AddPermissionGroup, Validation } from './permission-group-controller-protocols'

export class AddPermissionGroupController implements Controller {
  constructor (
    private readonly addPermissionGroup: AddPermissionGroup,
    private readonly validation: Validation,
    private readonly erroHandle: ErrorHandler
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, permission } = httpRequest.body

      const creditorContact = await this.addPermissionGroup.add({
        name,
        permission
      })

      return ok(creditorContact)
    } catch (error) {
      return this.erroHandle.handle(error)
    }
  }
}
