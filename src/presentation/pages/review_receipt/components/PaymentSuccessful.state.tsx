import { Dimensions, EdgeInsets } from '../../../../resources'
import { Body, BottomBar, Divider, Icon, Scaffold, StandardButton, Text, TextInput, VerticalSpacer } from '../../../components'
import { useTheme } from 'styled-components'
import { PresentationHelper } from '../../../../utils/helpers'
import { AppBarNav } from './AppBar.nav'
import { useContext, useRef } from 'react'
import { Field, Form, Formik, FormikProps } from 'formik'
import TableApi from '../../../../network/api/Table.api'
import { TableApiContext } from '../../../wrappers'
import { useMutation } from 'react-query'
import { IconsEnum } from '../../../../resources/icons'

interface EmailReceiptFormData {
  email: string
}

export interface PaymentSuccessfulStateProps {
  amount: number
  paymentId: string
  onBackToBill: () => void
}

export function PaymentSuccessfulState({
  amount,
  paymentId,
  onBackToBill 
}: PaymentSuccessfulStateProps): JSX.Element {

  const theme = useTheme()
  const tableApi: TableApi = useContext(TableApiContext)
  const formRef = useRef<FormikProps<EmailReceiptFormData>>(null)
  const formValues: EmailReceiptFormData = {
    email: ''
  }

  const {
    mutateAsync: sendInvoice,
    isLoading: sendInvoiceLoading,
  } = useMutation(tableApi.sendInvoice)

  const _validateEmail = (email: string): boolean => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  const _handleOnSubmit = async (values: EmailReceiptFormData): Promise<void> => {
    if (values.email && values.email !== '' && _validateEmail(values.email)) {
      try {
        await sendInvoice({
          payment_id: paymentId,
          email: values.email
        })
      } catch (error: unknown) {
        console.log(error)
      }
    }
  }

  return (
    <Scaffold>
      <AppBarNav />
      <Body
        isScrollable
        padding={ EdgeInsets.all(Dimensions.regular) }>
          <Formik
            innerRef={ formRef }
            initialValues={ formValues }
            onSubmit={ _handleOnSubmit }>
            <Form>
              <Icon
                icon={ IconsEnum.circleCheck }
                size={ Dimensions.iconExtraLarge }
                color={ theme.colorScheme.primaryContainer }  />
              <VerticalSpacer height={ Dimensions.regular } />
              <Text
                text='Payment successful'
                style={ theme.textTheme.headlineMedium } />
              <VerticalSpacer height={ Dimensions.extraSmall } />
              <Text
                text={ `You paid: ${PresentationHelper.formatCurrency(amount)}` } 
                style={ theme.textTheme.bodyMedium } />
             <Divider margin={ EdgeInsets.symmetric({
                vertical: Dimensions.regular
              })} />
              <Text
                text='Would you like a copy of the bill?' 
                style={ theme.textTheme.labelLarge }
                color={ theme.colorScheme.onSurface }  />
              <VerticalSpacer height={ Dimensions.regular } />
              <Field
                as={ TextInput }
                name='email'
                placeholder='Enter your email address'
                type='email' />
              <VerticalSpacer height={ Dimensions.regular } />
              <StandardButton
                outline
                loading={ sendInvoiceLoading }
                text='Email my receipt'
                onClick={ () => formRef.current?.submitForm() } />
              <VerticalSpacer height={ Dimensions.regular } />
              <Text
                text='Thanks for using RabbitPay, be sure to check out our website to learn more!' 
                style={ theme.textTheme.bodyMedium } />
            </Form>
          </Formik>
      </Body>
      <BottomBar>
        <StandardButton
          text='View bill summary'
          disabled={ sendInvoiceLoading } 
          color={ theme.colorScheme.secondaryContainer } 
          onClick={ onBackToBill } />
      </BottomBar>
    </Scaffold>
  )
}