import styled, { useTheme } from 'styled-components'
import { Icon } from '..'
import { IconsEnum } from '../../../../resources/icons'

const OuterContainer = styled.div<{
  backgroundColor: string,
  outline: boolean,
  size: string,
  color: string,
}>`
  cursor: pointer;
  color: ${(props): string => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  padding: calc(${(props): string => props.size}*0.50);
  background-color: ${(props): string =>
    props.backgroundColor
  };
  border: ${(props): string | null => props.outline
    ? `1px solid ${props.theme.colorScheme.outline}`
    : null
  };

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.95);
    opacity: 0.7;
  }
`

const Container = styled.div<{ size: string }>`
  width: ${(props): string => props.size};
  height: ${(props): string => props.size};
`

export interface IconButtonProps {
  icon: IconsEnum
  size?: string
  backgroundColor?: string
  color?: string
  outline?: boolean
  onClick?: () => void
}

export function IconButton({
  icon,
  size= '16px',
  backgroundColor = 'transparent',
  color,
  outline = false,
  onClick,
}: IconButtonProps): JSX.Element {

  const theme = useTheme()

  const _handleOnClick = (): void => {
    onClick?.()
  }

  return (
    <OuterContainer
      backgroundColor={ backgroundColor } 
      size={ size }
      color={ color ?? theme.colorScheme.onBackground }
      outline={ outline }
      onClick={ _handleOnClick }>
      <Container size={ size } >
        <Icon
          icon={ icon }
          size={ size }
          color={ color ?? theme.colorScheme.onBackground } />
      </Container>
    </OuterContainer>
  )
}
