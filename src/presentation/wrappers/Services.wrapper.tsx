import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { DefaultTheme, ThemeProvider } from "styled-components"
import { darkTheme, lighTheme } from "../../resources"
import { useSystemTheme } from "../../utils/hooks"

export interface ServicesWrapperProps {
  children?: ReactNode
}

export function ServicesWrapper({ children }: ServicesWrapperProps) {

  const [theme, themeToggler] = useSystemTheme()
  const appTheme: DefaultTheme = theme === 'light' ? lighTheme : darkTheme

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  return (
    <ThemeProvider theme={ appTheme }>
      <QueryClientProvider client={queryClient}>
        { children }
      </QueryClientProvider>
    </ThemeProvider>
  )
}
