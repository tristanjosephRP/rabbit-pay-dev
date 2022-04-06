import { useState } from 'react'
import { BillActionEnum, ChosenSaleEntry, useBill } from '../../../provider'
import { BillItemTile } from './Bill.tile'
import { QuantitySelectorSheet } from './QuantitySelector.sheet'

export interface BillItemsListProps {}

export function BillItemsList({}: BillItemsListProps): JSX.Element {

  const { state: bill, dispatch: dispatchBillAction } = useBill()
  const [open, setOpen] = useState<boolean>(false)
  const [item, setItem] = useState<ChosenSaleEntry>(bill.unpaidItems[0])

  const _handleItemClicked = (item: ChosenSaleEntry): void => {
    if (item.quantity > 1) {
      setItem(item)
      setOpen(true)
    } else if (item.chosenQuantity > 0) {
      item.chosenQuantity = 0
    } else {
      item.chosenQuantity = 1
    }
    _handleDispatch()
  }
  
  const _handleQuantityChosen = (quantity: number): void => {
    item.chosenQuantity = quantity
    _handleDispatch()
  }

  const _handleDispatch = (): void => {
    dispatchBillAction({
      type: BillActionEnum.splitByItems,
      items: bill.unpaidItems,
    })
  }

  return (
    <>
      { bill.unpaidItems.map((billItem: ChosenSaleEntry, index: number) => {
        return <BillItemTile
          key={ `bill_item_${index}` }
          item={ billItem }
          active={ billItem.chosenQuantity > 0 }
          onClick={ () => _handleItemClicked(billItem) } />
      })}
      <QuantitySelectorSheet
        open={ open }
        item={ item }
        onComplete={ _handleQuantityChosen }
        onClose={ () => setOpen(false) } />
    </>
  )
}