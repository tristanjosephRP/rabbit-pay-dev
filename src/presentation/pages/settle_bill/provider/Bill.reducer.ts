import { BillState, BillAction } from '.'
import { Payment, SaleEntry, Table } from '../../../../network/models'
import { AddTip, BillActionEnum, PayCustomAmount, PayInFull, SetLoading, SetPaymentMethod, SetRecheckBill, SetTable, SetUpdating, SplitByItems, SplitEvenly, UpdateTable } from './Bill.action'
import { BillTypeEnum, ChosenSaleEntry } from './Bill.state'

export class BillReducer {

  private _getBillTotal = (table: Table): number => {
    return table.items?.reduce((value: number, item: SaleEntry) =>
      value + (item.unit_amount*item.quantity),
      0
    ) ?? 0
  }

  private _getBillTotalPaid = (table: Table): number => {
    return table.payments?.reduce((value: number, payment: Payment) =>
      value + payment.total - payment.tip,
      0
    ) ?? 0
  }

  private _getUnpaidItems = (table: Table): ChosenSaleEntry[] => {
    let list: ChosenSaleEntry[] = []
    table.items.forEach((item: SaleEntry) => {
      const paidItem = table.paid_items.find((otherItem: SaleEntry) => 
        item.pos_sku === otherItem.pos_sku
      )
      if (paidItem) {
        if (paidItem.quantity < item.quantity) {
          const newItem: ChosenSaleEntry = {
            ...item,
            chosenQuantity: 0
          }
          newItem.quantity = item.quantity - paidItem.quantity
          list.push(newItem)
        }
      } else {
        const newItem: ChosenSaleEntry = {
          ...item,
          chosenQuantity: 0
        }
        list.push(newItem)
      }
    })
    return list
  }

  private _resetPaidItemQuantities = (state: BillState): ChosenSaleEntry[] => {
    return state.unpaidItems.map((item: ChosenSaleEntry) => {
      item.chosenQuantity = 0
      return item
    })
  }

  private _payInFull = (state: BillState, action: PayInFull): BillState => {
    return state.copyWith({
      type: BillTypeEnum.payInFull,
      totalToPay: Math.max(state.billTotal - state.totalPaid, 0),
      split: 2,
      unpaidItems: this._resetPaidItemQuantities(state)
    })
  } 

  private _splitByItems = (state: BillState, action: SplitByItems): BillState => {
    const totalToPay = action.items?.reduce((value: number, item: ChosenSaleEntry) => 
      value + (item.unit_amount*item.chosenQuantity), 0
    )
    return state.copyWith({
      type: BillTypeEnum.splitByItems,
      totalToPay: totalToPay ?? 0,
      split: 2,
      unpaidItems: action.items
    })
  } 

  private _splitEvenly = (state: BillState, action: SplitEvenly): BillState => {
    let totalToPay = state.billTotal/action.split
    if (totalToPay%1 !== 0) {
      totalToPay = Math.ceil(totalToPay)
    }
    return state.copyWith({
      type: BillTypeEnum.splitEvenly,
      totalToPay: totalToPay,
      split: action.split,
      unpaidItems: this._resetPaidItemQuantities(state)
    })
  } 

  private _payCustomAmount = (state: BillState, action: PayCustomAmount): BillState => {
    return state.copyWith({
      type: BillTypeEnum.payCustomAmount,
      totalToPay: action.amount,
      split: 2,
      unpaidItems: this._resetPaidItemQuantities(state)
    })
  } 

  private _addTip = (state: BillState, action: AddTip): BillState => {
    return state.copyWith({
      tipPercent: action.percent,
      customTip: action.custom ?? false
    })
  }

  private _setPaymentMethod = (state: BillState, action: SetPaymentMethod): BillState => {
    return state.copyWith({
      paymentMethod: action.method
    })
  } 

  private _setTable = (state: BillState, action: SetTable): BillState => {
    const total = this._getBillTotal(action.table)
    const totalPaid = this._getBillTotalPaid(action.table)
    return state.copyWith({
      loading: false,
      updating: false,
      billTotal: total,
      totalPaid: totalPaid,
      totalToPay: Math.max(total - totalPaid, 0),
      unpaidItems: this._getUnpaidItems(action.table),
      paidItems: action.table.paid_items,
      payments: action.table.payments,
      tableNumber: action.table.table_number,
      restaurantName: action.table.location_name,
      checkId: action.table.check_id,
    })
  } 

  private _updateTable = (state: BillState, action: UpdateTable): BillState => {
    const total = this._getBillTotal(action.table)
    const totalPaid = this._getBillTotalPaid(action.table)
    let totalToPay = state.totalToPay
    let newItems = this._getUnpaidItems(action.table)
    let recheckBill = false

    if (state.type ===  BillTypeEnum.splitEvenly || state.type === BillTypeEnum.payInFull) {
      totalToPay = Math.max(total - totalPaid, 0)
    } else if (state.type === BillTypeEnum.splitByItems) {
      state.unpaidItems.forEach((oldItem: ChosenSaleEntry) => {
        newItems.forEach((newItem: ChosenSaleEntry) => {
          if (oldItem.pos_sku === newItem.pos_sku && oldItem.chosenQuantity > 0) {
            newItem.chosenQuantity = oldItem.chosenQuantity
          }
        })
      })
    }

    if (state.billTotal !== total) {
      recheckBill = true
    }

    return state.copyWith({
      loading: false,
      updating: false,
      recheckBill: recheckBill,
      billTotal: total,
      totalPaid: totalPaid,
      totalToPay: totalToPay,
      unpaidItems: newItems,
      paidItems: action.table.paid_items,
      payments: action.table.payments,
    })
  } 

  private _setLoading = (state: BillState, action: SetLoading): BillState => {
    return state.copyWith({
      loading: action.loading,
    })
  } 

  private _setUpdating = (state: BillState, action: SetUpdating): BillState => {
    return state.copyWith({
      updating: action.updating,
    })
  } 

  private _setRecheckBill = (state: BillState, action: SetRecheckBill): BillState => {
    return state.copyWith({
      recheckBill: action.recheckBill,
    })
  } 

  public reduce = (state: BillState, action: BillAction): BillState => {
    switch (action.type) {
      case BillActionEnum.payInFull:
        return this._payInFull(state, action)
      case BillActionEnum.splitByItems:
        return this._splitByItems(state, action)
      case BillActionEnum.splitEvenly:
        return this._splitEvenly(state, action)
      case BillActionEnum.payCustomAmount:
        return this._payCustomAmount(state, action)
      case BillActionEnum.addTip:
        return this._addTip(state, action)
      case BillActionEnum.setPaymentMethod:
        return this._setPaymentMethod(state, action)
      case BillActionEnum.setTable:
        return this._setTable(state, action)
      case BillActionEnum.updateTable:
        return this._updateTable(state, action)
      case BillActionEnum.setLoading:
        return this._setLoading(state, action)
      case BillActionEnum.setUpdating:
        return this._setUpdating(state, action)
      case BillActionEnum.setRecheckBill:
        return this._setRecheckBill(state, action)
      default:
        throw new Error(`Unhandled action type: ${action}`)
    }
  }

}