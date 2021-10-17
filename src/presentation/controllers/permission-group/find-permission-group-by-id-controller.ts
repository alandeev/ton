import { FindPermissionGroupById } from '@/domain/usescasses/permission-group/find-permission-group-by-id'
import { ok, notFound } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols'
import { HttpRequest, HttpResponse, Controller } from './permission-group-controller-protocols'

export class FindPermissionGroupByIdController implements Controller {
  constructor (
    private readonly findPermissionGroupById: FindPermissionGroupById,
    private readonly erroHandle: ErrorHandler
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const contact = await this.findPermissionGroupById.findById(id)
      if (contact) {
        return ok(contact)
      }

      return notFound()
    } catch (error) {
      return this.erroHandle.handle(error)
    }
  }
}
