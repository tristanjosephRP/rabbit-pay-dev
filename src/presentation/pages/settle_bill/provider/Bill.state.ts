import { Payment, PaymentMethodEnum, SaleEntry } from "../../../../network/models"

export enum BillTypeEnum {
  payInFull = 'Paying in full',
  splitEvenly = 'Split evenly',
  payCustomAmount = 'Custom amount',
  splitByItems = 'Split by items',
}

export interface ChosenSaleEntry extends SaleEntry {
  chosenQuantity: number
}

export interface IBillState {
  loading?: boolean
  updating?: boolean
  recheckBill?: boolean
  type?: BillTypeEnum
  paymentMethod?: PaymentMethodEnum
  billTotal?: number
  totalPaid?: number
  totalToPay?: number
  split?: number
  tipPercent?: number
  customTip?: boolean
  paidItems?: SaleEntry[]
  unpaidItems?: ChosenSaleEntry[]
  payments?: Payment[]
  restaurantName?: string
  tableNumber?: string
  clientId?: string
  tableId?: string
  checkId?: string
}

export class BillState implements IBillState {

  constructor(input: IBillState) {
    this.loading = input.loading ?? false
    this.updating = input.updating ?? false
    this.recheckBill = input.recheckBill ?? false
    this.type = input.type ?? BillTypeEnum.payInFull
    this.paymentMethod = input.paymentMethod ?? PaymentMethodEnum.card
    this.billTotal = input.billTotal ?? 0
    this.totalPaid = input.totalPaid ?? 0
    this.totalToPay = input.totalToPay ?? 0
    this.split = input.split ?? 0
    this.paidItems = input.paidItems ?? []
    this.unpaidItems = input.unpaidItems ?? []
    this.tipPercent = input.tipPercent ?? 15
    this.customTip = input.customTip ?? false
    this.payments = input.payments ?? []
    this.restaurantName = input.restaurantName ?? ''
    this.tableNumber = input.tableNumber ?? ''
    this.clientId = input.clientId ?? ''
    this.tableId = input.tableId ?? ''
    this.checkId = input.checkId ?? ''
  }

  public loading: boolean
  public updating: boolean
  public recheckBill: boolean
  public type: BillTypeEnum
  public paymentMethod: PaymentMethodEnum
  public billTotal: number
  public totalPaid: number
  public totalToPay: number
  public split: number
  public paidItems: SaleEntry[]
  public unpaidItems: ChosenSaleEntry[]
  public tipPercent: number
  public customTip: boolean
  public payments: Payment[]
  public restaurantName: string
  public tableNumber: string
  public clientId: string
  public tableId: string
  public checkId: string

  public copyWith = (input: IBillState): BillState => {
    return new BillState({
      loading: input.loading ?? this.loading,
      updating: input.updating ?? this.updating,
      recheckBill: input.recheckBill ?? this.recheckBill,
      type: input.type ?? this.type,
      paymentMethod: input.paymentMethod ?? this.paymentMethod,
      billTotal: input.billTotal ?? this.billTotal,
      totalPaid: input.totalPaid ?? this.totalPaid,
      totalToPay: input.totalToPay ?? this.totalToPay,
      split: input.split ?? this.split,
      paidItems: input.paidItems ?? this.paidItems,
      unpaidItems: input.unpaidItems ?? this.unpaidItems,
      tipPercent: input.tipPercent ?? this.tipPercent,
      customTip: input.customTip ?? this.customTip,
      payments: input.payments ?? this.payments,
      restaurantName: input.restaurantName ?? this.restaurantName,
      tableNumber: input.tableNumber ?? this.tableNumber,
      tableId: this.tableId,
      clientId: this.clientId,
      checkId: input.checkId ?? this.checkId,
    })
  }
}