import styled, { useTheme } from 'styled-components'
import { Dimensions } from '../../../../resources'

const LogoContainer = styled.div<{ size: string, color?: string }>`
  width: ${(props): string => props.size};
  height: ${(props): string => props.size};
  border-radius: ${Dimensions.extraExtraSmall};
  background-color: ${(props): string =>
    props.color ?? props.theme.colorScheme.primary
  };
  padding: ${Dimensions.extraExtraSmall};
`

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: ${(props): string =>
    props.theme.colorScheme.onPrimary
  };
`

export interface LogoIconProps {
  size?: string
  color?: string
}

export function LogoIcon({
  size = '16px',
  color 
}: LogoIconProps ): JSX.Element {

  const theme = useTheme()

  return (
    <LogoContainer size={ size } color={ color }>
      <InnerContainer />
    </LogoContainer>
  )
}
