import { useState } from "react"
import { If, Then } from "react-if"
import { useTheme } from "styled-components"
import { PaymentMethodEnum } from "../../../../../network/models"
import { Dimensions, EdgeInsets } from "../../../../../resources"
import { IconsEnum } from "../../../../../resources/icons"
import { BaseContainer, Center, Text, VerticalSpacer } from "../../../../components"
import { BillActionEnum, useBill } from "../../provider"
import { EnterCardDetailsSheet } from "./EnterCardDetails.sheet"
import { PaymentButton } from "./Payment.button"

export interface PaymentMethodBlockProps {}

export function PaymentMethodBlock({}: PaymentMethodBlockProps): JSX.Element {

  const theme = useTheme()
  const { state: bill, dispatch, refetchTable } = useBill()
  const [open, setOpen] = useState<boolean>(false)

  const _handleMethodChosen = async (method: PaymentMethodEnum): Promise<void> => {
    dispatch({
      type: BillActionEnum.setPaymentMethod,
      method: method
    })
    await refetchTable()
    setOpen(true)
  }

  const supportsApplePay = navigator.vendor.includes('Apple')

  return (
    <>
      <BaseContainer
        display='flex'
        flexDirection='column'
        alignItems='stretch'
        backgroundColor={ theme.colorScheme.surface }
        padding={ EdgeInsets.all(Dimensions.regular) }
        margin={ EdgeInsets.fromTRBL({
          bottom: '72px'
        })}  >
        <Text
          text='Pay with'
          style={ theme.textTheme.titleMedium }/>
        <VerticalSpacer height={ Dimensions.regular } />
        <If condition={ supportsApplePay } >
          <Then>
            <PaymentButton
              title={ 'Apple pay' }
              icon={ IconsEnum.apple }
              onClick={ () => _handleMethodChosen(PaymentMethodEnum.applePay) } />
            <VerticalSpacer height={ Dimensions.extraSmall } />
          </Then>
        </If>
        <PaymentButton
          title={ 'Enter card details' }
          outline
          icon={ IconsEnum.plus }
          onClick={ () => _handleMethodChosen(PaymentMethodEnum.card) } />
        <VerticalSpacer height={ Dimensions.regular } />
        <Center>
          <Text
            text='Powered by RabbitPay'
            style={ theme.textTheme.labelMedium }
            color={ theme.colorScheme.onSurfaceVariant } />
        </Center>
        <VerticalSpacer height={ Dimensions.extraExtraSmall } />
      </BaseContainer>
      <EnterCardDetailsSheet
        open={ open && !bill.updating }
        onClose={ () => setOpen(false) } />
    </>
  )
}