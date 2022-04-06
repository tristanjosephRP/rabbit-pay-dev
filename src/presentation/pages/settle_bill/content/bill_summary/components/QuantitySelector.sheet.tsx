import { useState } from "react"
import styled from "styled-components"
import { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../../resources"
import { CurrencyEnum, PresentationHelper } from "../../../../../../utils/helpers"
import { BottomSheet, StandardButton, Stepper, Text, VerticalSpacer } from "../../../../../components"
import { ChosenSaleEntry, } from "../../../provider"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${EdgeInsets.all(Dimensions.regular)};
  background-color: ${(props): string =>
    props.theme.colorScheme.surface
  };
`

export interface QuantitySelectorSheetProps {
  open: boolean
  item: ChosenSaleEntry
  onComplete: (quantity: number) => void
  onClose?: () => void
}

export function QuantitySelectorSheet({
  open,
  item,
  onComplete,
  onClose,
}: QuantitySelectorSheetProps): JSX.Element {

  const theme = useTheme()
  const [quantity, setQuantity] = useState<number>(1)

  const _handleQuantityChanged = (value: number): void => {
    setQuantity(value)
  }

  const _handleComplete = (): void => {
    onComplete(quantity)
    setQuantity(1)
    onClose?.()
  }

  return (
    <BottomSheet
      open={ open }
      onClose={ onClose }
      title={ `${item?.description} (${item?.quantity})` }>
      <Container>
        <Text
          text='How many are you paying for?'
          style={ theme.textTheme.titleSmall }
          color={ theme.colorScheme.onSurface } />
        <VerticalSpacer height={ Dimensions.medium } />
        <Stepper
          value={ quantity }
          min={ 0 }
          max={ item?.quantity }
          onChange={ _handleQuantityChanged }/>
        <VerticalSpacer height={ Dimensions.medium } />
        <Text
          text={ PresentationHelper.formatCurrency(item?.unit_amount*quantity, CurrencyEnum.ZAR) }
          style={ theme.textTheme.bodyLarge } />
        <VerticalSpacer height={ Dimensions.medium } />
        <StandardButton
          text='Done'
          onClick={ _handleComplete } />
      </Container>
    </BottomSheet>
  )
}