import { PaymentMethodEnum, SaleEntry, Table } from "../../../../network/models"
import { ChosenSaleEntry } from "./Bill.state"

export enum BillActionEnum {
  payInFull,
  splitEvenly,
  payCustomAmount,
  splitByItems,
  addTip,
  setPaymentMethod,
  setTable,
  updateTable,
  setLoading,
  setUpdating,
  setRecheckBill,
}

export interface Action {
  type: BillActionEnum
}

export interface PayInFull extends Action {
  type: BillActionEnum.payInFull
}

export interface SplitEvenly extends Action {
  type: BillActionEnum.splitEvenly
  split: number
}

export interface PayCustomAmount extends Action {
  type: BillActionEnum.payCustomAmount
  amount: number
}

export interface SplitByItems extends Action {
  type: BillActionEnum.splitByItems
  items?: ChosenSaleEntry[]
}

export interface AddTip extends Action {
  type: BillActionEnum.addTip
  percent: number
  custom?: boolean
}

export interface SetPaymentMethod extends Action {
  type: BillActionEnum.setPaymentMethod
  method: PaymentMethodEnum
}

export interface SetTable extends Action {
  type: BillActionEnum.setTable
  table: Table
}

export interface UpdateTable extends Action {
  type: BillActionEnum.updateTable
  table: Table
}

export interface SetLoading extends Action {
  type: BillActionEnum.setLoading
  loading: boolean
}

export interface SetUpdating extends Action {
  type: BillActionEnum.setUpdating
  updating: boolean
}

export interface SetRecheckBill extends Action {
  type: BillActionEnum.setRecheckBill
  recheckBill: boolean
}

export type BillAction = PayInFull | SplitEvenly | PayCustomAmount | SplitByItems | AddTip | SetPaymentMethod | SetTable | UpdateTable | SetLoading | SetUpdating | SetRecheckBill
export type Dispatch = (action: BillAction) => void