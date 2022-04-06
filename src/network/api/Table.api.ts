import axios, { AxiosInstance } from "axios"
import { appConfig } from "../../config"
import ApiService from "../classes/ApiService"
import { Client, PaymentResponse, SaleEntry, Table, TransactionResponse } from "../models"

export interface InitiatePaymentInput {
  check_id: string
  total: number
  tip: number
  identifier: string
  registration_id?: string | null
  items?: SaleEntry[] | null
}

export interface SendInvoiceInput {
  payment_id: string
  email: string
}

export default class TableApi extends ApiService {
  constructor(axiosIns: AxiosInstance) {
    super(axios.create({
      baseURL: appConfig.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': appConfig.apiKey
      }
    }))
  }

  public getSaleEntries = async (tableId: string): Promise<Table> => {
    return this.get({
      url: '/table/detail',
      params: {
        table_id: tableId,
      },
    })
  }

  public getCheckSummary = async (checkId: string): Promise<Table> => {
    return this.get({
      url: '/table/check_summary',
      params: {
        check_id: checkId,
      },
    })
  }

  public initiatePayment = async (input: InitiatePaymentInput): Promise<PaymentResponse> => {
    return this.post({
      url: '/payment/initiate',
      data: input
    })
  }

  public getPayment = async (paymentId: string): Promise<TransactionResponse> => {
    return this.get({
      url: `/payment/${paymentId}`
    })
  }

  public getPaymentStatus = async (paymentId: string): Promise<TransactionResponse> => {
    return this.get({
      url: `/payment/status/${paymentId}`
    })
  }

  public getClient = async (clientId: string): Promise<Client> => {
    return this.get({
      url: `/client/${clientId}`
    })
  }

  public sendInvoice = async (input: SendInvoiceInput): Promise<Client> => {
    return this.post({
      url: `/invoice`,
      data: input,
    })
  }
}