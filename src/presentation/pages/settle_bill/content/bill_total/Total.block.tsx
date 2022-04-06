import styled from "styled-components"
import { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../resources"
import { CurrencyEnum, PresentationHelper } from "../../../../../utils/helpers"
import { BaseContainer, Divider, Text, VerticalSpacer } from "../../../../components"
import { BillTypeEnum, ChosenSaleEntry, useBill } from "../../provider"

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export interface TotalBlockProps {}

export function TotalBlock({}: TotalBlockProps): JSX.Element {

  const theme = useTheme()
  const { state: bill } = useBill()
  const subTotal = bill.totalToPay
  const tipAmount = subTotal*bill.tipPercent/100
  const grandTotal = subTotal + tipAmount
  const totalItems = bill.unpaidItems.reduce((value: number, item: ChosenSaleEntry) =>
    value + item.chosenQuantity, 0
  )

  const getTitle = (): string => {
    switch (bill.type) {
      case BillTypeEnum.payInFull:
        return 'Paying in full'
      case BillTypeEnum.splitByItems:
        return `Paying for items (${totalItems})`
      case BillTypeEnum.splitEvenly:
        return `Split evenly (${bill.split})`
      case BillTypeEnum.payCustomAmount:
        return `Paying custom amount`
    }
  }

  return (
    <BaseContainer
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      padding={ EdgeInsets.all(Dimensions.regular) }
      backgroundColor={ theme.colorScheme.surface }
      margin={ EdgeInsets.fromTRBL({
        bottom: Dimensions.extraSmall,
      })} >
      <Text
        text={ getTitle() }
        style={ theme.textTheme.titleMedium } />
      <VerticalSpacer height={ Dimensions.extraSmall } />
      <ItemRow>
        <Text
          text={ 'Subtotal (inc VAT)' }
          style={ theme.textTheme.bodyMedium }
          color={ theme.colorScheme.onSurface } />
        <Text
          text={ PresentationHelper.formatCurrency(subTotal, CurrencyEnum.ZAR) }
          style={ theme.textTheme.bodyMedium }
          color={ theme.colorScheme.onSurface } />
      </ItemRow>
      <VerticalSpacer height={ Dimensions.extraSmall } />
      <ItemRow>
        <Text
          text={ 'Tip' }
          style={ theme.textTheme.bodyMedium }
          color={ theme.colorScheme.onSurface } />
        <Text
          text={ PresentationHelper.formatCurrency(tipAmount, CurrencyEnum.ZAR) }
          style={ theme.textTheme.bodyMedium }
          color={ theme.colorScheme.onSurface } />
      </ItemRow>
      <Divider margin={ EdgeInsets.symmetric({
        vertical: Dimensions.regular
      })} />
      <ItemRow>
        <Text
          text={ 'Total' }
          style={ theme.textTheme.labelLarge } />
        <Text
          text={ PresentationHelper.formatCurrency(grandTotal, CurrencyEnum.ZAR) }
          style={ theme.textTheme.labelLarge } />
      </ItemRow>
      <VerticalSpacer height={ Dimensions.regular } />
    </BaseContainer>
  )
}