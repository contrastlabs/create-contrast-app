export class ErrorBase {
  message: string
  code: string
  status: number
  data?: any

  constructor(message: string, code: string, status: number, data?: any) {
    this.message = message
    this.code = code
    this.status = status
    this.data = data
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
      data: this.data,
    }
  }
}
