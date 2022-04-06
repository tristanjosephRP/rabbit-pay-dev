import { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../resources"
import { BaseContainer, Text } from "../../../components"

export interface AppBarNavProps {}

export function AppBarNav({}: AppBarNavProps): JSX.Element {

  const theme = useTheme()

  return (
    <BaseContainer
      display='flex'
      justifyContent='center'
      height='56px'
      backgroundColor={ theme.colorScheme.appBarBackground }
      padding={ EdgeInsets.all(Dimensions.regular) }   >
      <Text
        text='RabbitPay'
        style={ theme.textTheme.titleMedium?.copyWith({
          height: 0
        })}
        color={ theme.colorScheme.lightText }  />
    </BaseContainer>
  )
}