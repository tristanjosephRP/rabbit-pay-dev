import { useTheme } from 'styled-components'
import { Dimensions, EdgeInsets } from '../../../../resources'
import { IconsEnum } from '../../../../resources/icons'
import { Icon } from '../icons'
import { Text } from '../typography'
import { Column } from './Column'
import { Divider } from './Divider'
import { VerticalSpacer } from './VerticalSpacer'

export interface EmptyComponentProps {
  title?: string
  subtitle?: string
  icon?: IconsEnum
}

export function EmptyComponent({ 
  title,
  subtitle,
  icon = IconsEnum.burger,
 }: EmptyComponentProps): JSX.Element {

  const theme = useTheme()

  return (
    <Column 
      width='100%'
      height='100%'
      alignItems='center'
      justifyContent='center'
      padding={ EdgeInsets.symmetric({
        horizontal: Dimensions.regular
      })}>
      <Icon
        icon={ icon }
        size={ Dimensions.iconLarge }
        color={ theme.colorScheme.onBackground } />
      <VerticalSpacer  height={ Dimensions.large } />
      <Text
        text={ title ?? 'Oops!' }
        style={ theme.textTheme.titleLarge }
        color={ theme.colorScheme.onBackground } />
      <Divider margin={ EdgeInsets.symmetric({
        vertical: Dimensions.medium
      })} />
      <Text
        text={ subtitle ?? 'Your requested item could not be found' }
        style={ theme.textTheme.bodySmall }
        color={ theme.colorScheme.onSurface }
        align='center' />
    </Column>
  )
}
