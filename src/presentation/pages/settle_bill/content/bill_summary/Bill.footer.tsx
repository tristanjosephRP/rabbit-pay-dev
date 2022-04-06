import { If, Then } from 'react-if'
import { Dimensions } from '../../../../../resources'
import { VerticalSpacer } from '../../../../components'
import { ChosenSaleEntry, useBill } from '../../provider'
import { PaidItemsList } from './components/PaidItems.list'

export interface BillFooterProps {}

export function BillFooter({}: BillFooterProps): JSX.Element {

  const { state: bill } = useBill()

  return (
    <If condition={ bill.paidItems.length > 0 } >
      <Then>
        <PaidItemsList items={ bill.paidItems as ChosenSaleEntry[] } />
        <VerticalSpacer height={ Dimensions.regular } />
      </Then>
    </If>
  )
}