const { NODE_ENV } = process.env
export const IS_DEV = NODE_ENV === 'development'
import * as chalk from 'chalk'
import { format } from 'date-fns'
import { complement, isNil, pickBy } from 'ramda'

export const extractKeys = (data: object, params: string[]) => {
  const converted = {}
  params.forEach((v) => {
    converted[v] = data[v]
  })

  return converted
}

export const excludeKeys = (data: object, params: string[]) => {
  const converted = {}
  Object.keys(data).forEach((key) => {
    if (!params.includes(key)) converted[key] = data[key]
  })

  return converted
}

export const buildWithPartialData = <T>(Entity: new () => T, partialData: Partial<T>) => {
  const entity = new Entity()

  for (const key in partialData) {
    entity[key] = partialData[key]
  }

  return entity
}

export const delay = async (seconds: number) => {
  await new Promise((res, rej) => setTimeout(() => res(), 1000 * seconds))
}
;['log', 'error'].forEach((methodName) => {
  const originalMethod = console[methodName]
  console[methodName] = (...args) => {
    let initiator = 'unknown place'
    let functionName = ''
    let fileName = ''
    try {
      throw new Error()
    } catch (e) {
      if (typeof e.stack === 'string') {
        let isFirst = true
        for (const line of e.stack.split('\n')) {
          const matches = line.match(/^\s+at\s+(.*)/)
          if (matches) {
            if (!isFirst) {
              // first line - current function
              // second line - caller (what we are looking for)
              initiator = matches[1]

              // console.log(initiator)
              const detailMatches = initiator.match(/^[\s\w.]+/)
              const lineMatches = initiator.match(/\(.*\)/)

              functionName = detailMatches ? detailMatches[0] : ''
              fileName = lineMatches ? lineMatches[0] : ''

              break
            }
            isFirst = false
          }
        }
      }
    }
    if (functionName.length > 0) {
      originalMethod.apply(console, [
        chalk.red(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`),
        ...args,
        '\n',
        `  at ${chalk.blue(functionName)}${chalk.green(fileName)}`,
      ])
    } else {
      originalMethod.apply(console, [
        chalk.red(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`),
        ...args,
      ])
    }
  }
})

export const removeNullOrUndefinedFromObject = (object: object) => {
  return pickBy(complement(isNil), object)
}
