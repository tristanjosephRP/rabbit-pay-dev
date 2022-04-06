import { Else, If, Then } from 'react-if'
import styled, { useTheme } from 'styled-components'
import { CircleLoader, Icon } from '..'
import { CSS, Dimensions, EdgeInsets, ThemeUtil } from '../../../../resources'
import { IconsEnum } from '../../../../resources/icons'
import { HorizontalSpacer } from '../layout'
import { Text } from '../typography'

const Container = styled.div<{
  disabled: boolean,
  width: string,
  outline: boolean,
  backgroundColor: string,
  borderColor: string 
}>`
  height: ${(props): string => 
    props.theme.inputTheme.height
  };
  width: ${(props): string => props.width};;
  cursor: pointer;
  padding: 0px 16px;
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props): string =>
    props.backgroundColor
  };
  border: ${(props): string | null =>
    props.outline 
    ? `1px solid ${props.borderColor}` 
    : null
  };

  ${(props): CSS => ThemeUtil.buttonStyle({
    outline: props.outline,
    hoverStyle: {
      backgroundColor: props.theme.colorScheme.surfaceVariant,
    }
  })};
`

const LoaderContainer = styled.div`
  width: 20px;
  height: 20px;
`

const IconButtonContainer = styled.div<{
  disabled: boolean,
  width: string,
  outline: boolean,
  backgroundColor: string,
  borderColor: string
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props): string => 
    props.theme.inputTheme.height
  };
  width: ${(props): string => props.width};;
  cursor: pointer;
  padding: ${EdgeInsets.symmetric({
    horizontal: Dimensions.regular
  })};
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  background-color: ${(props): string =>
    props.backgroundColor
  };
  border: ${(props): number =>
    props.outline ? 1 : 0}px solid ${(props): string =>
      props.borderColor
  };

  ${(props): CSS => ThemeUtil.buttonStyle({
    outline: props.outline,
    hoverStyle: {
      backgroundColor: props.theme.colorScheme.surfaceVariant,
      padding: EdgeInsets.symmetric({
        horizontal: Dimensions.regular
      })
    }
  })};
`

export interface StandardButtonProps {
  text: string
  width?: string
  color?: string
  icon?: IconsEnum
  textColor?: string
  iconColor?: string
  outline?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function StandardButton({
  text,
  width = '100%',
  color,
  icon,
  textColor,
  iconColor,
  outline = false,
  loading = false,
  disabled = false,
  onClick }: StandardButtonProps
): JSX.Element {

  const _handleOnClick = (): void => {
    if (!loading && !disabled) {
      onClick?.()
    }
  }

  const theme = useTheme()

  const backgroundColor = outline
    ? 'none'
    : disabled
      ? theme.colorScheme.surfaceVariant
      : color ? color : theme.isDarkMode
        ? theme.colorScheme.secondaryContainer
        : theme.colorScheme.button

  const foregroundColor = outline
    ? disabled
      ? theme.colorScheme.background
      : color ? color : theme.colorScheme.button 
    : textColor ? textColor : theme.colorScheme.onPrimary

  return (
    <If condition={ !!icon }>
      <Then>
        <IconButtonContainer
          disabled={ disabled }
          width={ width }
          backgroundColor={ backgroundColor }
          borderColor={ foregroundColor }
          outline={ outline }
          onClick={ _handleOnClick } >
          <Icon icon={ icon! } color={ foregroundColor } />
          <Text
            text={ text }
            style={ theme.textTheme.labelLarge.copyWith({
              height: 2,
            })}
            color={ foregroundColor }/>
          <HorizontalSpacer width='24px'/>
        </IconButtonContainer>
      </Then>
      <Else>
        <Container
          disabled={ disabled }
          width={ width }
          outline={ outline }
          backgroundColor={ backgroundColor }
          borderColor={ foregroundColor }
          onClick={ _handleOnClick }>
          <If condition={ loading }>
            <Then>
              <LoaderContainer>
                <CircleLoader size='24px' color={ foregroundColor } />
              </LoaderContainer>
            </Then>
            <Else>
              <Text
                text={ text }
                style={ theme.textTheme.labelLarge.copyWith({
                  height: 2,
                })}
                color={ foregroundColor } />
            </Else>
          </If>
        </Container>
      </Else>
    </If>
  )
}
