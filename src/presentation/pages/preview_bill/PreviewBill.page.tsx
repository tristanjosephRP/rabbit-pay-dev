import { EmptyComponent, LoadingState, ThemedMetaHead } from '../../components'
import { Navigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { TableApiContext } from '../../wrappers'
import { useQuery } from 'react-query'
import TableApi from '../../../network/api/Table.api'
import { Case, Default, Switch } from 'react-if'
import { Client, Table } from '../../../network/models'
import { PreviewBillContent } from './components'
import { useTheme } from 'styled-components'

export interface PreviewBillProps {}

export function PreviewBillPage({}: PreviewBillProps): JSX.Element {

  const theme = useTheme()
  const { client_id, table_id } = useParams<string>()
  const tableApi: TableApi = useContext(TableApiContext)

  const {
    data: table,
    isLoading: tableLoading 
  } = useQuery<Table>('table', () => 
    tableApi.getSaleEntries(table_id ?? '')
  )

  const {
    data: client,
    isLoading: clientLoading 
  } = useQuery<Client>('client', () => 
    tableApi.getClient(client_id ?? '')
  )

  const isLoading = tableLoading || clientLoading

  return (
    <>
      <ThemedMetaHead lightColor={ theme.colorScheme.secondaryContainer } />
      <Switch>
        <Case condition={ isLoading }>
          <LoadingState />
        </Case>
        <Case condition={ !!table || !!client }>
          <PreviewBillContent
            client={ client! }
            table={ table }
            clientId={ client_id }
            tableId={ table_id } />
        </Case>
        <Default>
          <EmptyComponent subtitle="We can't process your request right now, please try again later!"/>
        </Default>
      </Switch>
    </>
  )
}