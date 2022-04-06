import styled, { useTheme } from 'styled-components'
import { Icon } from '..'
import { Dimensions, EdgeInsets } from '../../../../resources'
import { IconsEnum } from '../../../../resources/icons'
import { Text } from '../typography'

const Container = styled.div`
  max-width: 100%;
  height: ${(props): string => 
    props.theme.inputTheme.height
  };
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  border: 1px solid ${(props): string =>
    props.theme.colorScheme.outline
  };
  background-color: ${(props): string =>
    props.theme.colorScheme.surfaceVariant
  };
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${EdgeInsets.symmetric({
    horizontal: Dimensions.regular
  })};
  margin: ${EdgeInsets.symmetric({
    horizontal: Dimensions.regular
  })};
  cursor: pointer;

  &:focus {
    border: 1.5px solid ${(props): string =>
      props.theme.colorScheme.onBackground
    };
    border-radius: ${(props): string =>
      props.theme.inputTheme.borderRadius
    };
    padding: ${EdgeInsets.symmetric({
      horizontal: '15.5px'
    })};

    &:hover {
      border: 1.5px solid ${(props): string =>
        props.theme.colorScheme.onBackground
      };
    }
  }

  &:hover {
    border: 1px solid ${(props): string =>
      props.theme.colorScheme.onBackground
    };
  }
`

export interface DropdownButtonProps {
  text: string
  width?: string
  color?: string
  icon?: IconsEnum
  iconColor?: string
  outline?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function DropdownButton({
  text,
  width = 'auto',
  icon = IconsEnum.chevronDown,
  iconColor,
  loading = false,
  disabled = false,
  onClick }: DropdownButtonProps
): JSX.Element {

  const _handleOnClick = (): void => {
    if (!loading && !disabled) {
      onClick?.()
    }
  }

  const theme = useTheme()

  return (
    <Container onClick={ _handleOnClick }>
      <Text
        text={ text }
        style={ theme.textTheme.labelMedium.copyWith({ 
          height: 2
        })} />
      <Icon icon={ icon } />
    </Container>
  )
}
