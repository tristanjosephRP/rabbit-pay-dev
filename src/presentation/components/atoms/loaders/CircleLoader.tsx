import styled, { useTheme } from 'styled-components'

const Container = styled.div<{ size: string }>`
  width: ${(props): string => props.size};
  height: ${(props): string => props.size};
  display: flex;
  align-items: center;
  justify-content: center;
`

export interface CircleLoaderProps {
  color?: string
  size?: string
}

export function CircleLoader({
  color,
  size = '48px'
}: CircleLoaderProps): JSX.Element {

  const theme = useTheme()

  return (
    <Container size={ size }>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
        stroke={ color ?? theme.colorScheme.secondaryContainer }>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="750ms"
                repeatCount="indefinite"/>
            </path>
          </g>
        </g>
      </svg>
    </Container>
  )
}
