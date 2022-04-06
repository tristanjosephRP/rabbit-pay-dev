import styled from "styled-components"
import { ReactNode } from "react"
import { ThemeUtil } from "../../../../resources"
import { DeviceContainer } from "./DeviceContainer"

const DesktopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props): string =>
    props.theme.colorScheme.surfaceVariant
  };
`

const Container = styled.div`
  height: 100vh;
  ${ThemeUtil.responsiveProperty('width', {
    mobile: '100vw',
    tablet: '480px'
  })}
`

export interface AppContainerProps {
  children?: ReactNode
}

export function AppContainer({
  children
}: AppContainerProps): JSX.Element {

  return (
    <>
      <DeviceContainer tablet desktop>
        <DesktopContainer>
          <Container>
            { children }
          </Container>
        </DesktopContainer>
      </DeviceContainer>
      <DeviceContainer mobile>
        <Container>
          { children }
        </Container>
      </DeviceContainer>
    </>
  )
}