import { BillHeader } from './Bill.header'
import { BillState } from './Bill.state'
import { BillFooter } from './Bill.footer'
import { BaseContainer } from '../../../../components'
import { Dimensions, EdgeInsets } from '../../../../../resources'
import { useTheme } from 'styled-components'

export interface BillSummaryBlockProps {}

export function BillSummaryBlock({}: BillSummaryBlockProps): JSX.Element {
  
  const theme = useTheme()

  return (
    <BaseContainer 
      backgroundColor={ theme.colorScheme.surface }
      margin={ EdgeInsets.fromTRBL({
        bottom: Dimensions.extraSmall,
      })} >
      <BillHeader />
      <BillState />
      <BillFooter />
    </ BaseContainer>
  )
}