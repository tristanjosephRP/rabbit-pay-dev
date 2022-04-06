export enum PaymentMethodEnum {
  card = 'Card',
  applePay = 'ApplePay',
  googlePay = 'GooglePay',
}

export interface Payment {
  method: PaymentMethodEnum
  total: number
  tip: number
  identifier: string
}