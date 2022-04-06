import { If, Then } from 'react-if'
import styled, { useTheme } from 'styled-components'
import { Dimensions, EdgeInsets } from '../../../../../resources'
import { PriceTotalHeader, StandardButton, VerticalSpacer } from '../../../../components'
import { BillActionEnum, BillTypeEnum, useBill } from '../../provider'
import { PaymentsWrap } from './components/PaymentsWrap'
import { IconsEnum } from '../../../../../resources/icons'
import { CustomAmountSheet } from './components/CustomAmount.sheet'
import { useState } from 'react'

const Padding = styled.div`
  padding: ${EdgeInsets.symmetric({
    horizontal: Dimensions.regular,
    vertical: Dimensions.extraSmall,
  })};
`

export interface BillHeaderProps {}

export function BillHeader({}: BillHeaderProps): JSX.Element {

  const theme = useTheme()
  const { 
    state: bill,
    dispatch: dispatchBillAction 
  } = useBill()

  const [open, setOpen] = useState<boolean>(false)

  const _handleSplitByItems = (): void => {
    dispatchBillAction({
      type: BillActionEnum.splitByItems,
    })
  }

  const _handleSplitBill = (): void => {
    dispatchBillAction({
      type: BillActionEnum.splitEvenly,
      split: 2
    })
  }

  const _handlePayCustomAmount = (amount: number): void => {
    dispatchBillAction({
      type: BillActionEnum.payCustomAmount,
      amount: amount
    })
  }

  const _handleCloseModal = (): void => {
    setOpen(false)
  }

  return (
    <>
      <PriceTotalHeader total={ bill.billTotal } />
      <If condition={ bill.payments.length ?? 0 > 0 }>
        <Then>
          <PaymentsWrap
            totalPaid={ bill.billTotal - bill.totalPaid }
            payments={ bill.payments } />
        </Then>
      </If>
      <If condition={ bill.type === BillTypeEnum.payInFull }>
        <Then>
          <Padding>
            <If condition={ bill.unpaidItems.length > 0 } >
              <Then>
                <StandardButton
                  text='Split by items'
                  outline
                  icon={ IconsEnum.burger }
                  color={ theme.colorScheme.onBackground }
                  onClick={ _handleSplitByItems } />
                <VerticalSpacer height={ Dimensions.extraSmall } />
              </Then>
            </If>
            <StandardButton
              text='Split evenly'
              outline
              icon={ IconsEnum.bookmark }
              color={ theme.colorScheme.onBackground }
              onClick={ _handleSplitBill } />
            <VerticalSpacer height={ Dimensions.extraSmall } />
            <StandardButton
              text='Custom amount'
              outline
              icon={ IconsEnum.creditCard }
              color={ theme.colorScheme.onBackground }
              onClick={ () => setOpen(true) } />
          </Padding>
        </Then>
      </If>
      <CustomAmountSheet
        open={ open }
        maxAmount={ bill.billTotal }
        onComplete={ _handlePayCustomAmount }
        onClose={ _handleCloseModal } />
    </>
  )
}