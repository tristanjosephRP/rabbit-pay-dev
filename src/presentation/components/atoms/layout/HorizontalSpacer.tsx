import styled from 'styled-components'

const Container = styled.div<{ width: string }>`
  width: ${(props): string => props.width};
  min-width: ${(props): string => props.width};
`

export interface HorizontalSpacerProps {
  width?: string
}

export function HorizontalSpacer({ width = '0px' }: HorizontalSpacerProps): JSX.Element {
  return (
    <Container width={ width }/>
  )
}
