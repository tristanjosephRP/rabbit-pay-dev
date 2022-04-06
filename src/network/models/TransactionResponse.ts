import { PaymentMethodEnum } from "./Payment"

export interface TransactionResponse {
  id: string
  check_id: string
  method: PaymentMethodEnum
  total: number
  tip: number
  tpp_ref: string
  status: string
  identifier: string
  user_id: string
  registration_id: string
  pos_notification: boolean
}