import { ReactNode, RefObject } from 'react'
import styled from 'styled-components'

const Container = styled.div<ScaffoldProps>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export interface ScaffoldProps {
  ref?: RefObject<HTMLDivElement>
  children?: ReactNode
}

export function Scaffold({
  ref,
  children
}: ScaffoldProps ): JSX.Element {

  return (
    <Container ref={ ref } >
      { children }
    </Container>
  )
}