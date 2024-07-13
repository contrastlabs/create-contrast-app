export function isNull(value: any): value is null {
  return value === null
}

export function isUndefined(value: any): value is undefined {
  return value === undefined || typeof value === 'undefined'
}

export function isNullOrUndefined(value: any): value is undefined | null {
  return isNull(value) || isUndefined(value)
}

export function isString(value: any): value is string {
  return !isUndefined(value) && typeof value === 'string'
}

export function isEmptyString(value: string): value is string {
  return isString(value) && value.trim() === ''
}
