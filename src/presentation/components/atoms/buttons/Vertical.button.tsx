import styled, { useTheme } from 'styled-components'
import { Icon, Spacer } from '..'
import { Brightness, Dimensions, EdgeInsets, ThemeUtil } from '../../../../resources'
import { IconsEnum } from '../../../../resources/icons'
import { Text } from '../typography'

const Container = styled.div<{
  height: string
  width: string,
}>`
  height: ${(props): string => 
    props.height
  };
  width: ${(props): string => props.width};;
  cursor: pointer;
  padding: ${EdgeInsets.all(Dimensions.regular)};
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props): string =>
    props.theme.colorScheme.background
  };

  ${ThemeUtil.buttonStyle({})}
`

export interface VerticalButtonProps {
  text: string
  height?: string
  width?: string
  icon: IconsEnum
  onClick?: () => void
}

export function VerticalButton({
  text,
  height = '156px',
  width = 'auto',
  icon,
  onClick }: VerticalButtonProps
): JSX.Element {

  const theme = useTheme()

  const _handleOnClick = (): void => {
    onClick?.()
  }

  return (
    <Container
      height={ height }
      width={ width }
      onClick={ _handleOnClick } >
        <Spacer />
        <Icon
          icon={ icon }
          size={ Dimensions.iconExtraLarge }
          color={ theme.colorScheme.onBackground } />
        <Spacer />
        <Text
          text={ text }
          style={ theme.textTheme.labelLarge }
          color={ theme.colorScheme.onBackground } />
    </Container>
  )
}
