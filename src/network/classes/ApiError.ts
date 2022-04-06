export interface IErrorDetail {
  loc: string[]
  msg: string
  type: string
}

export interface IApiError {
  status?: number
  detail?: IErrorDetail[]
}

export class ApiError implements IApiError {

  constructor(input: {
    status?: number
    detail?: IErrorDetail[],
  }) {
    this.status = input.status
    this.detail = input.detail
  }

  public status?: number

  public detail?: IErrorDetail[]
}