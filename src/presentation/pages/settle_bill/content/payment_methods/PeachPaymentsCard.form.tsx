import { useEffect, useState } from "react"
import { Case, Default, Switch } from "react-if"
import styled from "styled-components"
import { appConfig } from "../../../../../config"
import { PaymentMethodEnum } from "../../../../../network/models"
import { Dimensions, EdgeInsets } from "../../../../../resources"
import { IconsEnum } from "../../../../../resources/icons"
import { BaseContainer, Center, CircleLoader, EmptyComponent } from "../../../../components"

const PeachForm = styled.form``

interface PeachPaymentsCardFormState {
  loading: boolean
  error: boolean
}

export interface PeachPaymentsCardFormProps {
  clientId: string
  tableId: string
  checkoutId: string
  paymentId: string
  method: PaymentMethodEnum
}

export function PeachPaymentsCardForm({
  clientId,
  tableId,
  checkoutId,
  paymentId,
  method,
}: PeachPaymentsCardFormProps): JSX.Element {

  const shopperResultUrl = `${window.location.origin}/client/${clientId}/table/${tableId}/payment/${paymentId}/status`

  const _getPaymentBrands = (): string => {
    switch (method) {
      case PaymentMethodEnum.card:
        return 'VISA MASTER'
      case PaymentMethodEnum.applePay:
        return 'APPLEPAY'
      default:
        return 'VISA MASTER'
    }
  }
  
  const [state, setState] = useState<PeachPaymentsCardFormState>({
    loading: true,
    error: false,
  })

  useEffect(() => {
    if (checkoutId != null) {
      const script = document.createElement('script')
      script.id = 'rbt-pay-payment-script'
      script.src = `${appConfig.peachBaseUrl}/paymentWidgets.js?checkoutId=${checkoutId}`
      script.async = true
      script.addEventListener('load', () => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }))
      })
      script.addEventListener('error', () => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: true,
        }))
      })
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [checkoutId])

  return (
    <BaseContainer
      padding={ EdgeInsets.symmetric({
        vertical: Dimensions.extraSmall,
      })}>
      <Switch>
        <Case condition={ state.loading }>
          <Center height='256px'>
            <CircleLoader />
          </Center>
        </Case>
        <Case condition={ state.error }>
          <EmptyComponent
            title='Oops!'
            subtitle='Something went wrong trying to load the form, please try again'
            icon={ IconsEnum.creditCard }/>
        </Case>
        <Default>
          <PeachForm 
            action={ shopperResultUrl }
            className='paymentWidgets'
            data-brands={ _getPaymentBrands() }  />
        </Default>
      </Switch>
    </BaseContainer>
  )

}