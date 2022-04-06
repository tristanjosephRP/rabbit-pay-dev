import styled from "styled-components"
import { useTheme } from "styled-components"
import { CSS, Dimensions, ThemeUtil } from "../../../../../resources"
import { IconsEnum } from "../../../../../resources/icons"
import { Icon, Spacer, Text } from "../../../../components"

const Container = styled.div<{ width: string, outline: boolean }>`
  width: ${(props): string =>
    props.width
  };
  height: ${(props): string => 
    props.theme.inputTheme.height
  };
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${Dimensions.extraSmall};
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  cursor: pointer;
  background-color: ${(props): string | null =>
    props.outline ? props.theme.colorScheme.surface
    : props.theme.colorScheme.onBackground
  };

  border: ${(props): string | null => props.outline
    ? `1px solid ${props.theme.colorScheme.outline}`
    : null 
  };

  ${(props): CSS => ThemeUtil.buttonStyle({
    hoverStyle: {
      padding: Dimensions.extraSmall,
      backgroundColor: props.theme.colorScheme.surfaceVariant,
    }
  })};
`

const IconContainer = styled.div<{ color: string }>`
  width: 56px;
  height: 28px;
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  background-color: ${(props): string =>
    props.color
  };
  display: flex;
  align-items: center;
  justify-content: center;
`

const Filler = styled.div<{ size: string }>`
  width: ${(props): string => props.size};
`

export interface PaymentButtonProps {
  width?: string
  title: string
  icon: IconsEnum
  outline?: boolean
  loading?: boolean
  onClick?: () => void
}

export function PaymentButton({
  width = '100%',
  title,
  icon,
  outline = false,
  loading = false,
  onClick
}: PaymentButtonProps): JSX.Element {

  const theme = useTheme()
  const iconSize: string = Dimensions.iconRegular

  const _handleOnClick = (): void => {
    onClick?.()
  }

  return (
    <Container
      width={ width }
      outline={ outline }
      onClick={ _handleOnClick }>
      <IconContainer color={ outline
        ? theme.colorScheme.surfaceVariant
        : theme.colorScheme.background }>
        <Icon
          icon={ icon }
          size={ iconSize }
          color={ theme.colorScheme.onBackground } />
      </IconContainer>
      <Spacer />
      <Text
        text={ title }
        style={ theme.textTheme.labelLarge.copyWith({
          height: 2,
        })}
        color={ outline
          ? theme.colorScheme.onBackground
          : theme.colorScheme.background } />
      <Spacer />
      <Filler size={ '56px' }/>
    </Container>
  )
}