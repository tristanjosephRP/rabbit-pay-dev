import styled, { useTheme } from 'styled-components'
import { Dimensions } from '../../../../resources'
import { getIcon, IconsEnum } from '../../../../resources/icons'

const Container = styled.div<{ width: string, height: string }>`
  width: ${(props): string => props.width};
  height: ${(props): string => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
`

export interface IconProps {
  icon: IconsEnum
  size?: string
  color?: string
}

export function Icon({
  icon,
  size = Dimensions.iconRegular,
  color }: IconProps
): JSX.Element {

  const theme = useTheme()

  return (
    <Container width={ size } height={ size }>
      {getIcon(icon, color ?? theme.colorScheme.onBackground)}
    </Container>
  )
}
