import styled from "styled-components"
import { ReactNode } from "react"
import { EdgeInsets } from "../../../../resources"

const Container = styled.div<CenterProps>`
  width: ${(props): string => props.width!};
  height: ${(props): string => props.height!};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${(props): string => props.padding!};
  margin: ${(props): string => props.margin!};
  background-color: ${(props): string | undefined =>
    props.backgroundColor
  }
`

export interface CenterProps {
  width?: string
  height?: string
  padding?: string
  margin?: string
  backgroundColor?: string
  children?: ReactNode
}

export function Center(props: CenterProps = {
  width: 'auto',
  height: 'auto',
  padding: EdgeInsets.all('0'),
  margin: EdgeInsets.all('0'),
}): JSX.Element {

  return (
    <Container {...props} >
      { props.children }
    </Container>
  )
}