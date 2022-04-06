import { ReactNode } from 'react'
import styled from 'styled-components'
import { CSS, ThemeUtil } from '../../../../resources'

const Container = styled.div<DeviceContainerProps>`
  ${(props): CSS => ThemeUtil.responsiveProperty('display', {
    mobile: props.mobile ? 'block' : 'none',
    tablet: props.tablet ? 'block' : 'none',
    desktop: props.desktop ? 'block' : 'none',
  })}
`

export interface DeviceContainerProps {
  mobile?: boolean
  tablet?: boolean
  desktop?: boolean
  children?: ReactNode
}

export function DeviceContainer({
  mobile = false,
  tablet = false,
  desktop = false,
  children
}: DeviceContainerProps ): JSX.Element {

  return (
    <Container
      mobile={ mobile }
      tablet={ tablet }
      desktop={ desktop } >
      { children }
    </Container>
  )
}