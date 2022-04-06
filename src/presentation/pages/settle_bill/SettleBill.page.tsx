import { ThemedMetaHead } from '../../components'
import { useParams } from 'react-router-dom'
import { BillProvider } from './provider'
import { useTheme } from 'styled-components'
import { SettleBillState } from './content/SettleBill.state'

export interface SettleBillPageProps {}

export function SettleBillPage({}: SettleBillPageProps): JSX.Element {

  const theme = useTheme()
  
  const { client_id, table_id } = useParams<string>()

  return (
    <BillProvider clientId={ client_id ?? '' } tableId={ table_id ?? '' }>
      <ThemedMetaHead lightColor={ theme.colorScheme.appBarBackground } />
      <SettleBillState />
    </BillProvider>
  )
}