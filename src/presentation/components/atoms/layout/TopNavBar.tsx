import styled from 'styled-components'

const Container = styled.div`
  position: sticky;
  top: 0;
  top: env(safe-area-inset-top);
  left: 0;
  right: 0;
  z-index: 5;
`

export interface TopNavBarProps {
  children?: JSX.Element
}

export function TopNavBar({ children }: TopNavBarProps): JSX.Element {
  return (
    <Container>
      { children }
    </Container>
  )
}
