import styled, { useTheme } from 'styled-components'
import { EmptyComponent, Scaffold, ThemedMetaHead } from '../../components'

export function NotFoundPage(): JSX.Element {

  const theme = useTheme()

  return (
    <>
      <ThemedMetaHead lightColor={ theme.colorScheme.neutral01 } />
      <Scaffold>
        <EmptyComponent
          title='Oops!'
          subtitle='Something went wrong'/>
      </Scaffold>
    </>
  )
}
