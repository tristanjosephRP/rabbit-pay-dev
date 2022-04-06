import { ReactNode } from 'react'
import styled from 'styled-components'
import { CSS, ThemeUtil } from '../../../../resources'

const ViewBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`

const InnerContainer = styled.div<{ width: string }>`
  ${(props): CSS => ThemeUtil.responsiveProperty('width', {
    mobile: '100vw',
    tablet: '100vw',
    desktop: props.width ?? '100vw',
    ultra: props.width ?? `${props.theme.maxWidth}px`,
  })}
`

export interface RestrictedViewBoxProps {
  width?: string
  children: ReactNode
}

export function RestrictedViewBox({ width, children }: RestrictedViewBoxProps): JSX.Element {
  return (
    <ViewBoxContainer>
      <InnerContainer width={width as string}>
        {children}
      </InnerContainer>
    </ViewBoxContainer>
  )
}
