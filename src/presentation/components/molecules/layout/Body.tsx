import { ReactNode, RefObject } from 'react'
import styled from 'styled-components'
import { EdgeInsets } from '../../../../resources'

const Container = styled.div<BodyProps>`
  position: relative;
  background-color: ${(props): string => 
    props.backgroundColor
    ? props.backgroundColor
    : props.theme.colorScheme.background
  };
  width: 100%;
  height: 100vh;
  overflow-y: ${(props): string => 
    props.isScrollable
    ? 'scroll'
    : 'clip'
  };
  padding: ${(props): string => 
    props.padding!
  }
`

export interface BodyProps {
  ref?: RefObject<HTMLDivElement>
  backgroundColor?: string
  isScrollable?: boolean
  padding?: string
  children?: ReactNode
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
}

export function Body({
  ref,
  backgroundColor,
  isScrollable = false,
  padding = EdgeInsets.all('0'),
  children,
  onScroll,
}: BodyProps ): JSX.Element {

  return (
    <Container
      ref={ ref }
      backgroundColor={ backgroundColor }
      isScrollable={ isScrollable }
      padding={ padding }
      onScroll={ onScroll } >
      { children }
    </Container>
  )
}