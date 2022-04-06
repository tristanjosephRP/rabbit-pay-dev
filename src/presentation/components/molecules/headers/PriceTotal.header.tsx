import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../resources"
import { Spacer, Text } from "../.."
import { CurrencyEnum, PresentationHelper } from "../../../../utils/helpers"

const Row = styled.div`
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${EdgeInsets.symmetric({
    horizontal: Dimensions.regular
  })};
  border-bottom: 1px solid ${(props): string =>
    props.theme.colorScheme.outline
  };
`

export interface PriceTotalHeaderProps {
  total: number
}

export function PriceTotalHeader({ total }: PriceTotalHeaderProps): JSX.Element {

  const themeData = useTheme()

  return (
    <Row>
      <Text
        text='Your table'
        style={ themeData.textTheme.titleLarge.copyWith({height: 0}) } />
      <Spacer />
      <Text
        text={ PresentationHelper.formatCurrency(total, CurrencyEnum.ZAR) }
        style={ themeData.textTheme.titleMedium.copyWith({height: 0}) } />
    </Row>
  )
}