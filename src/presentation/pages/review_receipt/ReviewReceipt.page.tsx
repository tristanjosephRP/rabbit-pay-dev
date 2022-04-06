import { LoadingState, ThemedMetaHead } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { TableApiContext } from '../../wrappers'
import { useQuery } from 'react-query'
import TableApi from '../../../network/api/Table.api'
import { Case, Default, Switch } from 'react-if'
import { TransactionResponse } from '../../../network/models'
import { useTheme } from 'styled-components'
import { PaymentSuccessfulState, PaymentUnsuccessfulState } from './components'
import useCookie from 'react-use-cookie'
import { AppConstants } from '../../../domain'

export interface ReviewReceiptPageProps {}

export function ReviewReceiptPage({}: ReviewReceiptPageProps): JSX.Element {

  const theme = useTheme()
  const navigateTo = useNavigate()
  const { client_id, table_id, payment_id } = useParams<string>()
  const tableApi: TableApi = useContext(TableApiContext)
  const [retries, setRetries] = useState<number>(1)
  const [cardRegId, setCardRegId] = useCookie(AppConstants.regCookieId)

  const { 
    data: transaction,
    isLoading: transactionLoading,
    refetch: refetchTransaction,
  } = useQuery<TransactionResponse>('transaction', () => 
    tableApi.getPayment(payment_id ?? '')
  )

  const { 
    data: transactionStatus,
    isLoading: transactionStatusLoading,
    refetch: refetchTransactionStatus,
  } = useQuery<TransactionResponse>('transactionStatus', () => 
    tableApi.getPayment(payment_id ?? ''), {
      enabled: false
    }
  )

  const isLoading = transactionLoading || transactionStatusLoading
  const transactionResponse = retries < 10 ? transaction : transactionStatus

  useEffect(() => {
    if (!transactionLoading && transaction?.status !== 'Successful' && retries < 10) {
      console.log(`Retry fetch payment: ${retries}`)
      setTimeout(() => {}, 200)
      refetchTransaction()
      setRetries(retries + 1)
    } else if (retries === 10) {
      console.log('Fetch status from peach')
      refetchTransactionStatus()
    } else if (transactionResponse?.status === 'Successful' && transactionResponse?.registration_id) {
      console.log('Setting COOKIE')
      setCardRegId(transactionResponse?.registration_id, {
        days: 365,
      })
    }
  }, [transactionLoading])

  const _handleOnBackToBill = (): void => {
    navigateTo(`/client/${client_id}/table/${table_id}/bill`)
  }

  const _handleOnGoToSummary = (): void => {
    navigateTo(`/client/${client_id}/table/${table_id}/check/${transactionResponse?.check_id}`)
  }

  return (
    <>
      <ThemedMetaHead lightColor={ theme.colorScheme.appBarBackground } />
      <Switch>
        <Case condition={ isLoading }>
          <LoadingState />
        </Case>
        <Case condition={ transactionResponse != null && transactionResponse?.status === 'Successful' }>
          <PaymentSuccessfulState
            amount={ transactionResponse?.total ?? 0 }
            paymentId={ payment_id! }
            onBackToBill={ _handleOnGoToSummary } />
        </Case>
        <Default>
         <PaymentUnsuccessfulState onBackToBill={ _handleOnBackToBill } />
        </Default>
      </Switch>
    </>
  )
}