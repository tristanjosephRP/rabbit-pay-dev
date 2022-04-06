import { ReactNode } from 'react'
import styled from 'styled-components'
import { Dimensions, EdgeInsets } from '../../../../resources'

const Container = styled.div<{ show: boolean }>`
  position: fixed;
  transition: all 0.2s ease;
  bottom: env(safe-area-inset-bottom, 0);
  transform: translateY(${(props): string =>
    props.show ? 'env(safe-area-inset-bottom, 0)' : '100%'
  });
  left: 0;
  right: 0;
  z-index: 5;
  padding: ${EdgeInsets.all(Dimensions.regular)};
  background-color: ${(props): string =>
    props.theme.colorScheme.appBarBackground
  };
  border-top: ${(props): string => 
    `1px solid ${props.theme.isDarkMode
      ? props.theme.colorScheme.surfaceVariant
      : 'none'
    }`
  }
`

export interface BottomBarProps {
  visible?: boolean
  children?: ReactNode
}

export function BottomBar({
  visible = true,
  children,
}: BottomBarProps): JSX.Element {
  
  return (
    <Container show={ visible }>
      { children }
    </Container>
  )
}
