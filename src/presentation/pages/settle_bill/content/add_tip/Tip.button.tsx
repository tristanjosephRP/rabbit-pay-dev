import styled from "styled-components"
import { useTheme } from "styled-components"
import { CSS, Dimensions, EdgeInsets, ThemeUtil } from "../../../../../resources"
import { CurrencyEnum, PresentationHelper } from "../../../../../utils/helpers"
import { Text } from "../../../../components"

const Container = styled.div<{ width: string, active: boolean }>`
  aspect-ratio: 1;
  width: ${(props): string => props.width};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props): string => EdgeInsets.all(props.active
    ? '3.5px'
    : Dimensions.extraExtraSmall
  )};
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  cursor: pointer;
  background-color: ${(props): string =>
    props.active
    ? props.theme.colorScheme.primaryHover
    : props.theme.colorScheme.surface
  };
  border: ${(props): string =>
    `${props.active ? 2 : 1.5}px
    solid 
    ${props.active
      ? props.theme.colorScheme.primary
      : props.theme.colorScheme.outline
    }`
  };

  ${(props): CSS => ThemeUtil.buttonStyle({
    outline: true,
    hoverStyle: {
      backgroundColor: props.theme.colorScheme.primaryHover,
      borderColor: props.theme.colorScheme.primary,
      borderWeight: '2px',
      padding: '3.5px'
    }
  })};
`

export interface TipButtonProps {
  width?: string
  price: number
  percentage: number
  active?: boolean
  onClick?: () => void
}

export function TipButton({
  width = '128px',
  price,
  percentage,
  active = false,
  onClick
}: TipButtonProps): JSX.Element {

  const theme = useTheme()

  const _handleOnClick = (): void => {
    onClick?.()
  }

  return (
    <Container
      width={ width }
      active={ active }
      onClick={ _handleOnClick }>
      <Text
        text={ `${percentage}%` }
        style={ theme.textTheme.labelLarge } />
      <Text
        text={ PresentationHelper.formatCurrency(price*percentage/100, CurrencyEnum.ZAR) }
        style={ theme.textTheme.labelMedium }
        color={ active 
          ? theme.colorScheme.primaryContainer 
          : theme.colorScheme.onSurface
        } />
    </Container>
  )
}