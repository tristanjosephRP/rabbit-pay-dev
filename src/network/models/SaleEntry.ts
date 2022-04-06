export interface SaleEntry {
  pos_ref_id: string
  pos_sku: string
  description: string
  quantity: number
  unit_amount: number
  amount_excl_tax?: number
  state: boolean
  parent_item_id?: string
}