import styled from 'styled-components'

const Container = styled.div<{ height: string }>`
  height: ${(props): string => props.height};
`

export interface VerticalSpacerProps {
  height?: string
}

export function VerticalSpacer({ height = '0px' }: VerticalSpacerProps): JSX.Element {
  return (
    <Container height={ height }/>
  )
}
