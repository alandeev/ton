import { badRequest, noContent, notFound } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols'
import { HttpRequest, HttpResponse, Controller, UpdatePermissionGroup, Validation } from './permission-group-controller-protocols'

export class UpdatePermissionGroupController implements Controller {
  constructor (
    private readonly updatePermissionGroup: UpdatePermissionGroup,
    private readonly validation: Validation,
    private readonly erroHandle: ErrorHandler
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { id } = httpRequest.params
      const {
        name,
        permission
      } = httpRequest.body

      const affeted = await this.updatePermissionGroup.update(
        id,
        {
          name,
          permission
        }
      )

      if (!affeted) {
        return notFound()
      }

      return noContent()
    } catch (error) {
      return this.erroHandle.handle(error)
    }
  }
}
