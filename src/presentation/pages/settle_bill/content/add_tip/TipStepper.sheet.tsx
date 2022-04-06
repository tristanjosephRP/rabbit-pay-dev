import styled from "styled-components"
import { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../resources"
import { CurrencyEnum, PresentationHelper } from "../../../../../utils/helpers"
import { BottomSheet, StandardButton, Stepper, Text, VerticalSpacer } from "../../../../components"
import { BillActionEnum, useBill } from "../../provider"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${EdgeInsets.all(Dimensions.regular)};
`

export interface TipStepperSheetProps {
  open: boolean
  onClose?: () => void
}

export function TipStepperSheet({
  open,
  onClose,
}: TipStepperSheetProps): JSX.Element {

  const theme = useTheme()
  const { state: bill, dispatch: dispatchBillAction } = useBill()

  const _handlePercentChanged = (value: number): void => {
    dispatchBillAction({
      type: BillActionEnum.addTip,
      percent: value,
      custom: true,
    })
  }

  return (
    <BottomSheet
      open={ open }
      onClose={ onClose }
      title='Custom tip'>
      <Container>
        <Text
          text='Choose a percentage'
          style={ theme.textTheme.titleSmall }
          color={ theme.colorScheme.onSurface } />
        <VerticalSpacer height={ Dimensions.medium } />
        <Stepper
          value={ bill.tipPercent }
          displayValue={ `${bill.tipPercent}%` }
          min={ 0 }
          max={ 50 }
          onChange={ _handlePercentChanged }/>
        <VerticalSpacer height={ Dimensions.medium } />
        <Text
          text={ PresentationHelper.formatCurrency(bill.totalToPay*bill.tipPercent/100, CurrencyEnum.ZAR) }
          style={ theme.textTheme.bodyLarge } />
        <VerticalSpacer height={ Dimensions.medium } />
        <StandardButton
          text='Done'
          onClick={ onClose } />
      </Container>
    </BottomSheet>
  )
}