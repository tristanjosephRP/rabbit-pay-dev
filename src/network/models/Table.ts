import { Payment } from "./Payment"
import { SaleEntry } from "./SaleEntry"

export interface Table {
  table_id: string
  location_name: string
  table_number: string
  check_id: string
  items: SaleEntry[]
  paid_items: SaleEntry[]
  payments: Payment[]
}