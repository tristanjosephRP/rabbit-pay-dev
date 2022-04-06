import { useState } from 'react'
import styled from 'styled-components'
import { Payment } from '../../../../../../network/models'
import { Dimensions, EdgeInsets } from '../../../../../../resources'
import { PresentationHelper } from '../../../../../../utils/helpers'
import { ChipButton, VerticalSpacer } from '../../../../../components'
import { PriceSplitHeader } from '../../../../../components/molecules/headers/PriceSplit.header'
import { PaymentDetailsSheet } from './PaymentDetails.sheet'

const ChipContainer = styled.div`
  padding: ${EdgeInsets.all(Dimensions.regular)};
  display: flex;
  flex-wrap: wrap;
  gap: ${Dimensions.extraSmall};
`

export interface PaymentsWrapProps {
  totalPaid: number
  payments: Payment[]
}

export function PaymentsWrap({
  totalPaid,
  payments
}: PaymentsWrapProps): JSX.Element {

  const [open, setOpen] = useState<boolean>(false)
  const [payment, setPayment] = useState<Payment>(payments[0])

  const _handleOpenPaymentSheet = (payment: Payment): void => {
    setPayment(payment)
    setOpen(true)
  }

  const _handleCloseModal = (): void => {
    setOpen(false)
  }

  return (
    <>
      <PriceSplitHeader
        title={ 'Remaining bill' }
        amount={ totalPaid } />
      <VerticalSpacer height={ Dimensions.extraSmall } />
      <ChipContainer>
        { payments.map((payment: Payment, index: number) => {
          return <ChipButton
            key={ `payment_chip_${index}` }
            title={ `${PresentationHelper.formatPaymetIdentifier(payment.identifier)}:` }
            value={ payment.total }
            active
            onClick={ () => _handleOpenPaymentSheet(payment) } />
        })}
      </ChipContainer>
      <PaymentDetailsSheet
        open={ open }
        onClose={ _handleCloseModal }
        payment={ payment } />
    </>
  )
}