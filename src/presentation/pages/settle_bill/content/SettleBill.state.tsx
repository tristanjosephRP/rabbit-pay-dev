import { LoadingState } from '../../../components'
import { Case, Default, Switch } from 'react-if'
import { SettleBillContent } from './SettleBill.content'
import { TableClosedContent } from './TableClosed.content'
import { useBill } from '../provider'
import { useNavigate } from 'react-router-dom'

export interface SettleBillStateProps {}

export function SettleBillState({}: SettleBillStateProps): JSX.Element {

  const { state: bill } = useBill()
  const navigateTo = useNavigate()

  const _handleBack = (): void => {
    navigateTo(`/client/${bill.clientId}/table/${bill.tableId}`)
  }

  return (
    <Switch>
      <Case condition={ bill.loading }>
        <LoadingState />
      </Case>
      <Case condition={ bill.tableNumber !== '' }>
        <SettleBillContent />
      </Case>
      <Default>
        <TableClosedContent onBackToBill={ _handleBack } />
      </Default>
    </Switch>
  )
}