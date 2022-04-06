import styled from 'styled-components'

const Padding = styled.div<DividerProps>`
  width: 100%;
  padding: ${(props): string => props.margin!};
`

const Container = styled.div<DividerProps>`
  height: ${(props): string =>
    props.type === 'horizontal'
    ? props.thickness!
    : '100%'
  };
  width: ${(props): string =>
    props.type === 'horizontal'
    ? '100%'
    : props.thickness!
  };
  background-color: ${(props): string =>
    props.color ?? props.theme.colorScheme.outline
  };
`

export interface DividerProps {
  margin?: string
  thickness?: string
  type?: 'vertical' | 'horizontal'
  color?: string
}

export function Divider({
  margin = '0px',
  thickness = '1px',
  type = 'horizontal',
  color 
}: DividerProps): JSX.Element {
  return (
    <Padding margin={ margin }>
      <Container
        margin={ margin }
        type={ type }
        thickness={ thickness }
        color={ color } />
    </Padding>
  )
}
