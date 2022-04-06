import { useTheme } from "styled-components"
import { Dimensions } from "../../../../../resources"
import { CurrencyEnum, PresentationHelper } from "../../../../../utils/helpers"
import { BaseContainer, Column, HorizontalSpacer, Row, Spacer, StandardButton, Text } from "../../../../components"
import { BillTypeEnum, useBill } from "../../provider"

export interface PayNowBottomBarProps {
  onPayNow: () => void
}

export function PayNowBottomBar({
  onPayNow,
}: PayNowBottomBarProps): JSX.Element {

  const { state: bill } = useBill()
  const theme = useTheme()

  const payType = bill.type === BillTypeEnum.payInFull && bill.billTotal !== bill.totalToPay
    ? 'Paying remaining'
    : bill.type

  const amount = PresentationHelper.formatCurrency(
    bill.totalToPay + (bill.totalToPay*bill.tipPercent/100), CurrencyEnum.ZAR
  )

  return (
    <Row alignItems='center' >
      <Spacer>
        <Column >
            <Row>
              <Text
                text={ amount } 
                style={ theme.textTheme.titleMedium?.copyWith({
                  height: 0
                })}
                color={ theme.colorScheme.onPrimary } />
              <HorizontalSpacer width={ Dimensions.extraExtraSmall } />
              <Text
                text='(incl Tip)' 
                style={ theme.textTheme.labelSmall?.copyWith({
                  height: 0
                })}
                color={ theme.colorScheme.onPrimary } />
            </Row>
            <Text
              text={ payType } 
              style={ theme.textTheme.bodySmall?.copyWith({
                height: 0
              })}
              color={ theme.colorScheme.onPrimary }  />
        </Column>
      </Spacer>
      <HorizontalSpacer width={ Dimensions.large } />
      <StandardButton
          text='Pay now'
          width='156px'
          color={ theme.colorScheme.secondaryContainer }
          onClick={ onPayNow } />
    </Row>
  )
}