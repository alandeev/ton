import { badRequest, noContent, notFound } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols'
import { HttpRequest, HttpResponse, Controller, RemovePermissionGroup, Validation } from './permission-group-controller-protocols'

export class RemovePermissionGroupController implements Controller {
  constructor (
    private readonly removePermissionGroup: RemovePermissionGroup,
    private readonly validation: Validation,
    private readonly erroHandle: ErrorHandler
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { id } = httpRequest.params
      const affected = await this.removePermissionGroup.remove(id)

      if (!affected) {
        return notFound()
      }

      return noContent()
    } catch (error) {
      return this.erroHandle.handle(error)
    }
  }
}
