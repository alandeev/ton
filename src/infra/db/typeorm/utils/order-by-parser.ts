const parse = (orderBy: string, entity: any): [string, 'ASC' | 'DESC'] => {
  if (orderBy) {
    const [field, direction] = orderBy.split(':')
    const order: any = direction.toUpperCase()
    const sort = entity.mapOrderBy()[field](field)

    return [sort , order]
  }
}

export const OrderByParser = { parse }
