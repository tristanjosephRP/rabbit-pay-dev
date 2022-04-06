import styled from 'styled-components'
import { AppTextStyles, TextStyle } from '../../../../resources'

export type TextAlignment = 'left' | 'center' | 'right' | 'justify'
export type TextDecorations = 'none' | 'underline' | 'overline' | 'line-through'

const MainContainer = styled.div<{
  align: TextAlignment,
}>`
  text-align: ${(props): string => props.align};
`

const TextContainer = styled.div<{ 
  style: TextStyle,
  decoration: TextDecorations,
  color?: string,
}>`
  display: contents;
  color: ${(props): string => props.color ?? props.theme.colorScheme.onBackground};
  text-decoration: ${(props): string => props.decoration};
  text-transform: ${(props): string => props.style.case};
  line-height: ${(props): number => props.style.height};
  font-weight: ${(props): number => props.style.weight};
  font-size: ${(props): number => props.style.size}px;
`

export interface TextProps {
  text: string
  style?: TextStyle
  align?: TextAlignment
  decoration?: TextDecorations
  color?: string
  className?: string
}

export function Text({ 
  text,
  style = AppTextStyles.instance.bodySmall,
  align = 'left',
  decoration = 'none',
  color,
  className 
}: TextProps ): JSX.Element {
  return (
    <MainContainer align={ align }>
      <TextContainer
        style={ style }
        decoration={ decoration }
        color={ color }
        className={ className }>
        {text}
      </TextContainer>
    </MainContainer>
  )
}
