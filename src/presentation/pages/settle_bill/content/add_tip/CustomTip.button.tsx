import styled from "styled-components"
import { useTheme } from "styled-components"
import { CSS, Dimensions, EdgeInsets, ThemeUtil } from "../../../../../resources"
import { IconsEnum } from "../../../../../resources/icons"
import { HorizontalSpacer, Icon, Spacer, Text } from "../../../../components"

const Container = styled.div<{ active: boolean }>`
  width: 100%;
  height: ${(props): string => 
    props.theme.inputTheme.height
  };
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${(props): string => EdgeInsets.symmetric({
    horizontal: props.active
      ? '15.5px'
      : Dimensions.regular
  })};
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
      padding: '15.5px'
    }
  })};
`

export interface CustomTipButtonProps {
  tip: number
  active?: boolean
  onClick?: () => void
}

export function CustomTipButton({
  tip,
  active = false,
  onClick
}: CustomTipButtonProps): JSX.Element {

  const theme = useTheme()

  const _handleOnClick = (): void => {
    onClick?.()
  }

  return (
    <Container
      active={ active }
      onClick={ _handleOnClick }>
      <Text
        text={ active
          ? 'Custom tip'
          : 'Or add a custom tip' 
        }
        style={ theme.textTheme.bodyMedium.copyWith({
          height: 2,
        })} />
      <Spacer />
      <Text
        text={active ? `${tip}%` : ''}
        style={ theme.textTheme.bodyMedium.copyWith({
          height: 2,
        })}
        color={ active
          ? theme.colorScheme.primaryContainer
          : theme.colorScheme.onBackground 
        } />
      <HorizontalSpacer width={ Dimensions.extraSmall } />
      <Icon
        icon={ IconsEnum.pen }
        size={ Dimensions.iconSmall }
        color={ active
          ? theme.colorScheme.onBackground
          : theme.colorScheme.onSurface 
        } />
    </Container>
  )
}