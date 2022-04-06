import axios, { AxiosInstance } from "axios"
import { createContext, ReactNode } from "react"
import { appConfig } from "../../config"
import TableApi from "../../network/api/Table.api"

export const TableApiContext = createContext<TableApi>(new TableApi(axios.create()))

export interface ApiWrapperProps {
  children?: ReactNode
}

export function ApiWrapper({ children }: ApiWrapperProps) {

  const axiosInstace: AxiosInstance = axios.create({
    baseURL: appConfig.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': appConfig.apiKey
    }
  })
  const tableApi: TableApi = new TableApi(axiosInstace)

  return (
    <TableApiContext.Provider value={ tableApi }>
      { children }
    </TableApiContext.Provider>
  )
}
