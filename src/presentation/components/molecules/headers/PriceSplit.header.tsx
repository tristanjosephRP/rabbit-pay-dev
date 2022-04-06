import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../resources"
import { CurrencyEnum, PresentationHelper } from "../../../../utils/helpers"
import { HorizontalSpacer, Spacer, Text, TextButton } from "../.."
import { If, Then } from "react-if"

const Row = styled.div`
  height: 40px;
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

export interface PriceSplitHeaderProps {
  title: string
  amount?: number
  onClear?: () => void
}

export function PriceSplitHeader({
  title,
  amount,
  onClear,
}: PriceSplitHeaderProps): JSX.Element {

  const themeData = useTheme()

  const _handleOnClear = (): void => {
    onClear?.()
  }

  return (
    <Row>
      <Text
        text={ title }
        style={ themeData.textTheme.labelLarge.copyWith({
          height: 0
        })} />
      <HorizontalSpacer width={ Dimensions.extraSmall } />
      <If condition={ !!onClear }>
        <Then>
          <TextButton
            text='Clear'
            onClick={ _handleOnClear }
            color={ themeData.colorScheme.secondaryContainer } />
        </Then>
      </If>
      <Spacer />
      <If condition={ amount != null } >
        <Then>
          <Text
            text={ PresentationHelper.formatCurrency(amount ?? 0, CurrencyEnum.ZAR) }
            style={ themeData.textTheme.bodyMedium.copyWith({
              height: 0
            })} />
        </Then>
      </If>
    </Row>
  )
}