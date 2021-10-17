import { FindPermissionGroupByPage } from '@/domain/usescasses/permission-group/find-permission-group-by-page'
import { ok } from '@/presentation/helpers/http/http-helper'
import { ErrorHandler } from '@/presentation/protocols'
import { HttpRequest, HttpResponse, Controller } from './permission-group-controller-protocols'

export class FindPermissionGroupByPageController implements Controller {
  constructor (
    private readonly findPermissionGroupByPage: FindPermissionGroupByPage,
    private readonly erroHandle: ErrorHandler
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, limit, filter, orderBy } = httpRequest.query
      const { role } = httpRequest.params
      
      const parsedFilter = `role=${String(role)};${String(filter)}`

      const contactsPage = await this.findPermissionGroupByPage.findByPage(page, limit, parsedFilter, orderBy)

      return ok(contactsPage)
    } catch (error) {
      return this.erroHandle.handle(error)
    }
  }
}
