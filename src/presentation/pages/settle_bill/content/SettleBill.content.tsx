import { BaseContainer, Body, BottomBar, Scaffold } from '../../../components'
import { MerchantHeader } from './nav/Merchant.header'
import { BillSummaryBlock } from './bill_summary/BillSummary.block'
import { AddTipBlock } from './add_tip/AddTip.block'
import { TotalBlock } from './bill_total/Total.block'
import { PaymentMethodBlock } from './payment_methods/PaymentMethod.block'
import { UIEvent, useEffect, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useBill } from '../provider'
import { scrollIntoView } from "seamless-scroll-polyfill"
import { AppBarNav } from './nav/AppBar.nav'
import { Dimensions, EdgeInsets } from '../../../../resources'
import { PayNowBottomBar } from './nav/PayNowBottomBar.nav'

const RefContainer = styled.div``

export interface SettleBillContentProps {}

export function SettleBillContent({}: SettleBillContentProps): JSX.Element {

  const { state: bill } = useBill()
  const theme = useTheme()
  const bodyStartRef = useRef<HTMLDivElement>(null)
  const paymentBlockRef = useRef<HTMLDivElement>(null)
  const bodyEndRef = useRef<HTMLDivElement>(null)
  const [showBottomBar, setShowBottomBar] = useState<boolean>(true)

  useEffect(() => {
    if (bodyStartRef.current) {
      scrollIntoView(bodyStartRef.current, {
        behavior: 'smooth',
        block: 'start',
        inline: 'center'
      })
    }
    _handleOnScroll()
  }, [bill.type])

  const _handleOnPayNowClicked = (): void => {
    if (bodyEndRef.current) {
      scrollIntoView(bodyEndRef.current, {
        behavior: 'smooth',
        block: 'end',
        inline: 'center'
      })
    }
  }
  
  const _handleOnScroll = (event?: UIEvent<HTMLDivElement>): void => {
    const bodyOffsetTop = event?.currentTarget?.scrollTop ?? 0
    const bodyHeight = window.innerHeight ?? 0
    const refOffsetTop = (paymentBlockRef?.current?.offsetTop ?? 0) + 128
    setShowBottomBar(bodyOffsetTop + bodyHeight <= refOffsetTop)
  }

  return (
    <Body
      isScrollable
      onScroll={ _handleOnScroll }
      backgroundColor={ theme.colorScheme.appBarBackground } >
      <RefContainer ref={ bodyStartRef } />
      <AppBarNav />
      <MerchantHeader />
      <BaseContainer
        backgroundColor={ theme.isDarkMode
          ? theme.colorScheme.background
          : theme.colorScheme.surfaceVariant 
        }
        padding={ EdgeInsets.fromTRBL({
          bottom: Dimensions.extraSmall,
        })} >
        <BillSummaryBlock />
        <AddTipBlock />
        <TotalBlock />
        <RefContainer ref={ paymentBlockRef } />
        <PaymentMethodBlock  />
      </BaseContainer>
      <RefContainer ref={ bodyEndRef } />
      <BottomBar visible={ showBottomBar }>
        <PayNowBottomBar onPayNow={ _handleOnPayNowClicked }/>
      </BottomBar>
    </Body>
  )
}