import { Dimensions, EdgeInsets } from '../../../../resources'
import { Body, BottomBar, EmptyComponent, Scaffold, StandardButton } from '../../../components'
import { IconsEnum } from '../../../../resources/icons'
import { useTheme } from 'styled-components'
import { AppBarNav } from './AppBar.nav'

export interface PaymentUnsuccessfulStateProps {
  onBackToBill: () => void
}

export function PaymentUnsuccessfulState({ onBackToBill }: PaymentUnsuccessfulStateProps): JSX.Element {

  const theme = useTheme()

  return (
    <Scaffold>
      <AppBarNav />
      <Body padding={ EdgeInsets.all(Dimensions.regular) }>
        <EmptyComponent
          subtitle='Your payment was unsuccessful'
          icon={ IconsEnum.close } />
      </Body>
      <BottomBar>
        <StandardButton
          text='Back to bill'
          color={ theme.colorScheme.secondaryContainer }
          onClick={ onBackToBill } />
      </BottomBar>
    </Scaffold>
  )
}