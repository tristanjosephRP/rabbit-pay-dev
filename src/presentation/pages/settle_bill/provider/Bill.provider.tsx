import { createContext, ReactNode, useCallback, useContext, useEffect, useReducer } from "react"
import { BillReducer } from "."
import TableApi from "../../../../network/api/Table.api"
import { TableApiContext } from "../../../wrappers"
import { BillActionEnum, Dispatch } from "./Bill.action"
import { BillState } from "./Bill.state"

export const BillStateContext = createContext<{ 
  state: BillState,
  dispatch: Dispatch,
  refetchTable: () => void
} | undefined> (undefined)

export interface BillProviderProps {
  clientId: string
  tableId: string
  children?: ReactNode
}

export function BillProvider({
  clientId,
  tableId,
  children 
}: BillProviderProps): JSX.Element {

  const tableApi: TableApi = useContext(TableApiContext)

  const billState: BillState = new BillState({
    loading: true,
    tableId: tableId,
    clientId: clientId,
  })

  const billReducer = new BillReducer()
  const [state, dispatch] = useReducer(billReducer.reduce, billState)

  useEffect(() => {
    getTable()
  }, [])

  const getTable = async (): Promise<void> => {
    try {
      const table = await tableApi.getSaleEntries(tableId)
      dispatch({
        type: BillActionEnum.setTable,
        table: table
      })
    } catch (error: unknown) {
      dispatch({
        type: BillActionEnum.setLoading,
        loading: false
      })
      console.log(error)
    }
    
  }

  const refetchTable = async (): Promise<void> => {
    try {
      const table = await tableApi.getSaleEntries(tableId)
      dispatch({
        type: BillActionEnum.setUpdating,
        updating: true
      })
      dispatch({
        type: BillActionEnum.updateTable,
        table: table
      })
    } catch (error: unknown) {
      dispatch({
        type: BillActionEnum.setLoading,
        loading: false
      })
      console.log(error)
    }
  }

  const value = { state, dispatch, refetchTable }

  return (
    <BillStateContext.Provider value={ value }>
      { children }
    </BillStateContext.Provider>
  )
}

export function useBill() {
  const context = useContext(BillStateContext)
  if (context === undefined) {
    throw new Error('useBill must be used within a BillProvider')
  }
  return context
}