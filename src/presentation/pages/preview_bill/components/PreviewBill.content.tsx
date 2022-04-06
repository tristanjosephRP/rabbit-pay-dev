import { useTheme } from 'styled-components'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Brightness, Dimensions, EdgeInsets } from '../../../../resources'
import { BaseContainer, Body, BottomBar, Center, Column, Icon, PriceTotalHeader, Scaffold, Spacer, StandardButton, Text, VerticalButton, VerticalSpacer } from '../../../components'
import { IconsEnum } from '../../../../resources/icons'
import { Client, SaleEntry, Table } from '../../../../network/models'
import { PreviewBillHeader } from './PreviewBill.header'

const ReceiptContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  background-color: ${(props): string => 
    props.theme.colorScheme.background
  };
  margin: ${EdgeInsets.symmetric({
    horizontal: Dimensions.regular
  })};
`

const ButtonContainer = styled.div`
  padding: ${EdgeInsets.all(Dimensions.regular)};
`

const PaymentMethodRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${Dimensions.small};
`

export interface PreviewBillContentProps {
  table?: Table
  client: Client
  clientId?: string
  tableId?: string
}

export function PreviewBillContent({
  client,
  table,
  clientId,
  tableId 
}: PreviewBillContentProps): JSX.Element {

  const theme = useTheme()
  const navigateTo = useNavigate()

  const total = table?.items?.reduce((value: number, item: SaleEntry) =>
    value + item.unit_amount*item.quantity,
    0
  )

  const _handleOnViewWebsite = (): void => {
    window.open(client.menu_url)
  }

  const _handleOnViewMenu = (): void => {
    window.open(client.menu_url)
  }

  const _handleOnPayBillClicked = (): void => {
    navigateTo(`/client/${clientId}/table/${tableId}/bill`)
  }

  return (
    <Column height='100%'>
      <PreviewBillHeader client={ client } />
      <Spacer />
      <ReceiptContainer>
        <PriceTotalHeader total={ total ?? 0 }/>
        <ButtonContainer>
          <StandardButton
            text='View bill & pay now'
            color={ theme.colorScheme.onBackground }
            textColor={ theme.brightness === Brightness.light
              ? theme.colorScheme.onPrimary
              : theme.colorScheme.darkText }
            onClick={ _handleOnPayBillClicked } />
          <VerticalSpacer height={ Dimensions.regular } />
          <Center>
            <Text
              text='Powered by RabbitPay'
              style={ theme.textTheme.labelMedium }
              color={ theme.colorScheme.onSurfaceVariant } />
          </Center>
          <VerticalSpacer height={ Dimensions.regular } />
          <PaymentMethodRow>
            <Icon
              icon={ IconsEnum.ccApplePay }
              size={ Dimensions.iconLarge }
              color={ theme.colorScheme.onBackground } />
            <Icon
              icon={ IconsEnum.ccVisa }
              size={ Dimensions.iconLarge }
              color={ theme.colorScheme.onBackground } />
            <Icon
              icon={ IconsEnum.ccMastercard }
              size={ Dimensions.iconLarge }
              color={ theme.colorScheme.onBackground } />
          </PaymentMethodRow>
        </ButtonContainer>
      </ReceiptContainer>
      <Spacer />
    </Column>
  )
}