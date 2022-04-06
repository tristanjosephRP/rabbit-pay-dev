import styled from "styled-components"
import { ReactNode } from "react"
import { EdgeInsets } from "../../../../resources"

export type AlignItems = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'flex-end' | 'initial' | 'initial'
export type JustifyContent = 'flex-start' | 'flex-end'  |'center' | 'space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit'
export type flexDirection = 'row' | 'column'
export type Display = 'flex' | 'block' | 'inline'

const Container = styled.div<BaseContainerProps>`
  width: ${(props): string => props.width!};
  height: ${(props): string => props.height!};
  max-height: ${(props): string => props.maxHeight!};
  display: ${(props): string => props.display!};
  flex-direction: ${(props): string => props.flexDirection!};
  align-items: ${(props): string => props.alignItems!};
  justify-content: ${(props): string => props.justifyContent!};
  gap: ${(props): string => props.gap!};
  padding: ${(props): string => props.padding!};
  margin: ${(props): string => props.margin!};
  background-color: ${(props): string | undefined =>
    props.backgroundColor
  };
  position: relative;
`

export interface BaseContainerProps {
  width?: string
  height?: string
  maxHeight?: string
  display?: Display
  flexDirection?: flexDirection
  alignItems?: AlignItems
  justifyContent?: JustifyContent
  gap?: string
  padding?: string
  margin?: string
  backgroundColor?: string
  children?: ReactNode
}

export function BaseContainer(props: BaseContainerProps = {
  width: 'auto',
  height: 'auto',
  maxHeight: 'auto',
  display: 'block',
  flexDirection: 'row',
  alignItems: 'initial',
  justifyContent: 'initial',
  gap: '0',
  padding: EdgeInsets.all('0'),
  margin: EdgeInsets.all('0'),
}): JSX.Element {

  return (
    <Container {...props} >
      { props.children }
    </Container>
  )
}