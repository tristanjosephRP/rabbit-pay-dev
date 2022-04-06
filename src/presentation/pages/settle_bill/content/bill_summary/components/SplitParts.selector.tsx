import styled from "styled-components"
import { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../../resources"
import { CurrencyEnum, PresentationHelper } from "../../../../../../utils/helpers"
import { Stepper, Text, VerticalSpacer } from "../../../../../components"
import { BillActionEnum, useBill } from "../../../provider"
import { PriceSplitHeader } from "../../../../../components/molecules/headers/PriceSplit.header"

const Container = styled.div<{
  padding?: string,
  align?: 'center' | 'flex-start' | 'flex-end' 
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props): string =>
    props.align ?? 'flex-start'
  };
  padding: ${(props): string =>
    props.padding ?? '0px'
  };
`

export interface SplitPartsBlockProps {
  amount: number
  onClear: () => void
}

export function SplitPartsBlock({
  amount,
  onClear,
}: SplitPartsBlockProps): JSX.Element {

  const theme = useTheme()
  const { state: bill, dispatch: dispatchBillAction } = useBill()

  const _handlePartsChanged = (value: number): void => {
    dispatchBillAction({
      type: BillActionEnum.splitEvenly,
      split: value
    })
  }

  return (
    <>
      <PriceSplitHeader
        title={ 'Split evenly' }
        amount={ amount }
        onClear={ onClear } />
      <Container
        padding={ EdgeInsets.all(Dimensions.regular) }
        align='center' >
        <Text
          text='Select the number of guests'
          style={ theme.textTheme.titleSmall }
          color={ theme.colorScheme.onSurface } />
        <VerticalSpacer height={ Dimensions.medium } />
        <Stepper
          value={ bill.split }
          min={ 2 }
          max={ 10 }
          onChange={ _handlePartsChanged }/>
        <VerticalSpacer height={ Dimensions.medium } />
        <Text
          text={ `${PresentationHelper.formatCurrency(amount, CurrencyEnum.ZAR)} each` }
          style={ theme.textTheme.bodyLarge } />
      </Container>
    </>
  )
}