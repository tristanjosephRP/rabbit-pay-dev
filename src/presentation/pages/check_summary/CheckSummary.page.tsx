import { EmptyComponent, LoadingState, ThemedMetaHead } from '../../components'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import TableApi from '../../../network/api/Table.api'
import { useContext } from 'react'
import { TableApiContext } from '../../wrappers'
import { useQuery } from 'react-query'
import { Table } from '../../../network/models'
import { Case, Default, Switch } from 'react-if'
import { CheckSummaryContent } from './components/CheckSummary.content'

export interface CheckSummaryPageProps {}

export function CheckSummaryPage({}: CheckSummaryPageProps): JSX.Element {

  const theme = useTheme()
  const { client_id, table_id, check_id } = useParams<string>()
  const tableApi: TableApi = useContext(TableApiContext)

  const {
    data: check,
    isLoading: checkLoading 
  } = useQuery<Table>('check', () => 
    tableApi.getCheckSummary(check_id ?? '')
  )

  return (
    <>
      <ThemedMetaHead lightColor={ theme.colorScheme.appBarBackground } />
      <Switch>
        <Case condition={ checkLoading }>
          <LoadingState />
        </Case>
        <Case condition={ !!check }>
          <CheckSummaryContent clientId={ client_id } table={ check } />
        </Case>
        <Default>
          <EmptyComponent subtitle="We can't process your request right now, please try again later!"/>
        </Default>
      </Switch>
    </>
  )
}