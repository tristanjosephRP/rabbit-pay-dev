import { Case, Switch } from 'react-if'
import { Dimensions } from '../../../../../resources'
import { VerticalSpacer } from '../../../../components'
import { BillActionEnum, BillTypeEnum, ChosenSaleEntry, useBill } from '../../provider'
import { PriceSplitHeader } from '../../../../components/molecules/headers/PriceSplit.header'
import { SplitPartsBlock } from './components/SplitParts.selector'
import { BillItemsList } from './components/BillItems.list'

export interface BillStateProps {}

export function BillState({}: BillStateProps): JSX.Element {

  const { 
    state: bill,
    dispatch: dispatchBillAction 
  } = useBill()

  const totalItems = bill.unpaidItems.reduce((value: number, item: ChosenSaleEntry) =>
    value + item.chosenQuantity, 0
  )

  const _handleOnClear = (): void => {
    dispatchBillAction({
      type: BillActionEnum.payInFull,
    })
  }

  return (
    <Switch>
      <Case condition={ bill.type === BillTypeEnum.payInFull && bill.unpaidItems.length > 0 }>
        <PriceSplitHeader title={ 'Items:' } />
        <VerticalSpacer height={ Dimensions.extraSmall } />
        <BillItemsList />
        <VerticalSpacer height={ Dimensions.extraSmall } />
      </Case>
      <Case condition={ bill.type === BillTypeEnum.splitByItems }>
        <PriceSplitHeader
          title={ `Your items (${totalItems})` }
          amount={ bill.totalToPay }
          onClear={ _handleOnClear } />
        <VerticalSpacer height={ Dimensions.extraSmall } />
        <BillItemsList />
        <VerticalSpacer height={ Dimensions.extraSmall } />
      </Case>
      <Case condition={ bill.type === BillTypeEnum.splitEvenly }>
        <SplitPartsBlock
          amount={ bill.totalToPay }
          onClear={ _handleOnClear } />
        <VerticalSpacer height={ Dimensions.extraSmall } />
      </Case>
      <Case condition={ bill.type === BillTypeEnum.payCustomAmount }>
        <PriceSplitHeader
          title={ 'Custom amount' }
          amount={ bill.totalToPay }
          onClear={ _handleOnClear } />
        <VerticalSpacer height={ Dimensions.regular } />
      </Case>
    </Switch>
  )
}