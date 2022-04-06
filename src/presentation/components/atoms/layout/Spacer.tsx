import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex-grow: 1;
`

export interface SpacerProps {
  children?: ReactNode
}

export function Spacer({ children }: SpacerProps): JSX.Element {
  return (
    <Container>
      {children}
    </Container>
  )
}
