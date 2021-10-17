import { ObjectLiteral } from '@/shared/types/object-literal'

const parseByMapFilter = (filter = '', entity?: any): ObjectLiteral[] => {
  const orConditionsGroups = filter.split('|')
  const whereOrCondtions = []

  for (const orConditionGroup of orConditionsGroups) {
    const andConditionGroup = orConditionGroup.split(';')
    const where = {}
    const mapFilter = entity?.mapFilter()
    andConditionGroup.forEach(parsebleString => {
      const [property, value] = parsebleString.split('=')
      const hasData = value !== null && value !== '' && value !== 'undefined'
      const hasProperty = mapFilter[property]

      const [relation, propertyRelation] = property.split('.')
      const hasRelation = !!propertyRelation

      if (property && hasProperty && hasData && !hasRelation) {
        where[property] = mapFilter[property](value)
      } else if (hasRelation) {
        where[relation] = { [propertyRelation]: mapFilter[property](value) }
      }
    })
    const contenWhere = Object.values(where)
    contenWhere.length > 0 && whereOrCondtions.push(where)
  }

  return whereOrCondtions
}

const parseByMapFilterJoin = (filter = '', entity?: any): ObjectLiteral[] => {
  const orConditionsGroups = filter.split('|')
  let whereOrCondtionsString = ''
  let whereOrCondtions = {}
  const name = entity.name as string
  const entityName = name[0].toLowerCase() + name.substring(1).replace('Entity', '')

  for (const orConditionGroup of orConditionsGroups) {
    const andConditionGroup = orConditionGroup.split(';')
    const where = {}
    const mapFilter = entity?.mapFilter()
    andConditionGroup.forEach(parsebleString => {
      const [property, value] = parsebleString.split('=')
      const hasData = value !== null && value !== '' && value !== 'undefined'
      const hasProperty = mapFilter[property]

      const [, propertyRelation] = property.split('.')
      const hasRelation = !!propertyRelation

      if (property && hasProperty && hasData && !hasRelation) {
        where[property] = mapFilter[property](value)
        whereOrCondtionsString = `${whereOrCondtionsString !== '' ? `${whereOrCondtionsString} AND ` : ''}${entityName}.${property} = :${property}`
      } else if (hasRelation) {
        where[property.replace('.', '_')] = mapFilter[property](value)
        whereOrCondtionsString = `${whereOrCondtionsString !== '' ? `${whereOrCondtionsString} AND ` : ''}${property} = :${property.replace('.', '_')}`
      }
    })
    const contenWhere = Object.values(where)
    if (contenWhere.length) {
      whereOrCondtions = where
    }
  }

  return [
    whereOrCondtionsString,
    whereOrCondtions
  ]
}

export const FilterParser = { parseByMapFilter, parseByMapFilterJoin }
