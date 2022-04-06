import { Dimensions, EdgeInsets } from '../../../../resources'
import { Body, BottomBar, EmptyComponent, Scaffold, StandardButton } from '../../../components'
import { IconsEnum } from '../../../../resources/icons'
import { useTheme } from 'styled-components'
import { AppBarNav } from '../../review_receipt/components'

export interface TableClosedContentProps {
  onBackToBill: () => void
}

export function TableClosedContent({ onBackToBill }: TableClosedContentProps): JSX.Element {

  const theme = useTheme()

  return (
    <Scaffold>
      <AppBarNav />
      <Body padding={ EdgeInsets.all(Dimensions.regular) }>
        <EmptyComponent
          title='Table closed'
          subtitle='Chat to your waiter and start ordering, be sure to come back here to pay your bill!'
          icon={ IconsEnum.burger } />
      </Body>
      <BottomBar>
        <StandardButton
          text='Okay, got it!'
          color={ theme.colorScheme.secondaryContainer }
          onClick={ onBackToBill } />
      </BottomBar>
    </Scaffold>
  )
}