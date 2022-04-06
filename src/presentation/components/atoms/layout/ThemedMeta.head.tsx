import { Helmet } from 'react-helmet'
import { useTheme } from 'styled-components'

export interface ThemedMetaHead {
  lightColor: string
  darkColor?: string
}

export function ThemedMetaHead({
  lightColor,
  darkColor, 
}: ThemedMetaHead): JSX.Element {

  return (
    <Helmet>
      <meta name="theme-color" 
        content={ lightColor } 
        media="(prefers-color-scheme: light)" />
      <meta name="theme-color" 
        content={ darkColor ? darkColor : lightColor } 
        media="(prefers-color-scheme: dark)" />
        <style>
          {`
            body {
              background-color: ${ lightColor };
            }
          `}
      </style>
    </Helmet>
  )
}
