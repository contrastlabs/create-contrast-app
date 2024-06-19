export function isNull(value: any): value is null {
  return value === null
}

export function isUndefined(value: any): value is undefined {
  return value === undefined || typeof value === 'undefined'
}

export function isNullOrUndefined(value: any): value is undefined | null {
  return isNull(value) || isUndefined(value)
}
