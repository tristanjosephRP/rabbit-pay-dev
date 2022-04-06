import { If, Then } from "react-if"
import styled from "styled-components"
import { useTheme } from "styled-components"
import { Brightness, Dimensions, EdgeInsets, FontWeight } from "../../../../resources"
import { CurrencyEnum, PresentationHelper } from "../../../../utils/helpers"
import { HorizontalSpacer } from "../layout"
import { Text } from "../typography"

const Container = styled.div<{ active: boolean }>`
  height: 36px;
  display: flex;
  align-items: center;
  padding: ${(props): string => EdgeInsets.symmetric({
    horizontal: props.active
    ? '11.5px'
    : Dimensions.small
  })};
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  cursor: pointer;
  background-color: ${(props): string =>
    props.active
    ? props.theme.colorScheme.secondaryHover
    : props.theme.colorScheme.surface
  };
  border: ${(props): string =>
    `${props.active ? 2 : 1.5}px
    solid 
    ${props.active
      ? props.theme.colorScheme.secondaryContainer
      : props.theme.colorScheme.outline
    }`
  };

  &:hover {
    background-color: ${(props): string =>
      props.theme.colorScheme.secondaryHover
    };
    border: ${(props): string =>
      `2px solid ${props.theme.colorScheme.secondary}`
    };
    padding: ${EdgeInsets.symmetric({
      horizontal: '11.5px'
    })};
  }
`

export interface ChipButtonProps {
  title: string
  value?: number
  active?: boolean
  onClick?: () => void
}

export function ChipButton({
  title,
  value,
  active = false,
  onClick
}: ChipButtonProps): JSX.Element {

  const theme = useTheme()

  const _handleOnClick = (): void => {
    onClick?.()
  }

  return (
    <Container
      active={ active }
      onClick={ _handleOnClick }>
      <Text
        text={ title }
        style={ theme.textTheme.labelLarge.copyWith({
          height: 2,
        })}
        color={ theme.colorScheme.onBackground } />
      <If condition={ !!value }>
        <Then>
          <HorizontalSpacer width={ Dimensions.extraExtraSmall }  />
          <Text
            text={ PresentationHelper.formatCurrency(value!, CurrencyEnum.ZAR) }
            style={ theme.textTheme.labelMedium.copyWith({
              height: 2,
              weight: FontWeight.regular
            })}
            color={ active 
              ? theme.brightness === Brightness.dark
                ? theme.colorScheme.secondaryContainer
                : theme.colorScheme.secondary 
              : theme.colorScheme.onSurface
            } />
          </Then>
      </If>
    </Container>
  )
}