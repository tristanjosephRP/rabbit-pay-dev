import styled, { useTheme } from 'styled-components'
import { Text } from '../typography'

const Container = styled.div<{ width: string, color: string }>`
  width: ${(props): string => props.width};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props): string => props.color};
  &:hover {
    opacity: 0.6;
  }
  text-decoration: underline;
`

export interface TextButtonProps {
  text: string
  width?: string
  color?: string
  onClick?: () => void
}

export function TextButton({
  text,
  width = 'auto',
  color,
  onClick 
}: TextButtonProps): JSX.Element {

  const theme = useTheme()

  const _handleOnClick = (): void => {
    onClick?.()
  }

  return (
    <Container
      width={ width }
      color={ color ?? theme.colorScheme.onSurface }
      onClick={ _handleOnClick } >
      <Text
        text={ text }
        style={ theme.textTheme.labelLarge.copyWith({
          height: 0
        })}
        color={ color ?? theme.colorScheme.onSurface } />
    </Container>
  )
}
