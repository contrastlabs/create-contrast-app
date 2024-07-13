export class ErrorBase {
  message: string
  code: string
  status: number
  details?: any

  constructor(message: string, code: string, status: number, details?: any) {
    this.message = message
    this.code = code
    this.status = status
    this.details = details
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
      details: this.details,
    }
  }
}
