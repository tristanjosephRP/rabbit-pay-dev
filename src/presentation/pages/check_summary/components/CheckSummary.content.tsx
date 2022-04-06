import { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Dimensions, EdgeInsets } from '../../../../resources'
import { BaseContainer, Body, BottomBar, PriceTotalHeader, Scaffold, StandardButton, VerticalSpacer } from '../../../components'
import { SaleEntry, Table } from '../../../../network/models'
import { AppBarNav } from '../../review_receipt/components'
import { If, Then } from 'react-if'
import { PaymentsWrap } from '../../settle_bill/content/bill_summary/components/PaymentsWrap'
import { PriceSplitHeader } from '../../../components/molecules/headers/PriceSplit.header'
import { BillItemTile } from '../../settle_bill/content/bill_summary/components/Bill.tile'
import { ChosenSaleEntry } from '../../settle_bill/provider'

export interface PreviewBillContentProps {
  clientId?: string
  table?: Table
}

export function CheckSummaryContent({
  clientId,
  table,
}: PreviewBillContentProps): JSX.Element {

  const theme = useTheme()
  const navigateTo = useNavigate()

  const total = table?.items?.reduce((value: number, item: SaleEntry) =>
    value + item.unit_amount*item.quantity,
    0
  ) ?? 0

  const totalPaid = table?.paid_items?.reduce((value: number, item: SaleEntry) =>
    value + item.unit_amount*item.quantity,
    0
  ) ?? 0

  const _handleOnBackToBill = (): void => {
    navigateTo(`/client/${clientId}/table/${table?.table_id}/bill`)
  }

  return (
    <Scaffold>
      <AppBarNav />
      <Body
        isScrollable
        backgroundColor={ theme.colorScheme.surfaceVariant }
        padding={ EdgeInsets.fromTRBL({
          bottom: '128px'
        }) } >
        <BaseContainer
          backgroundColor={ theme.colorScheme.background }
          padding={ EdgeInsets.fromTRBL({
            bottom: Dimensions.extraSmall,
          })} >
          <PriceTotalHeader total={ total } />
          <If condition={ table?.payments.length ?? 0 > 0 }>
            <Then>
              <PaymentsWrap
                totalPaid={ total - totalPaid }
                payments={ table?.payments ?? [] } />
            </Then>
          </If>
          <PriceSplitHeader title={ 'Items:' } />
          <VerticalSpacer height={ Dimensions.extraSmall } />
          { table?.items.map((billItem: SaleEntry, index: number) => {
            return <BillItemTile
              key={ `check_item_${index}` }
              item={ billItem as ChosenSaleEntry } />
          })}
          <VerticalSpacer height={ Dimensions.extraSmall } />
        </BaseContainer>
      </Body>
      <BottomBar>
        <BaseContainer>
          <StandardButton
            text='Pay again'
            color={ theme.colorScheme.secondaryContainer } 
            onClick={ _handleOnBackToBill } />
        </BaseContainer>
      </BottomBar>
    </Scaffold>
  )
}