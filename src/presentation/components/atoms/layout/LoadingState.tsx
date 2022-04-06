import { useTheme } from 'styled-components'
import { Dimensions, EdgeInsets } from '../../../../resources'
import { CircleLoader } from '../loaders'
import { BaseContainer } from './BaseContainer'

export interface LoadingStateProps {}

export function LoadingState({}: LoadingStateProps): JSX.Element {

  const theme = useTheme()

  return (
    <BaseContainer
      width='100%'
      height='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      padding={ EdgeInsets.symmetric({
        horizontal: Dimensions.regular
      })}>
      <CircleLoader
        size='56px'
        color={ theme.colorScheme.lightText } />
    </BaseContainer>
  )
}
