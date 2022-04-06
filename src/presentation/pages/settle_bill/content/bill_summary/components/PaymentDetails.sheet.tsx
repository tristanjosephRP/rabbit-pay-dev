import styled from "styled-components"
import { useTheme } from "styled-components"
import { Payment } from "../../../../../../network/models"
import { Dimensions, EdgeInsets } from "../../../../../../resources"
import { PresentationHelper } from "../../../../../../utils/helpers"
import { BaseContainer, BottomSheet, Column, Divider, HorizontalSpacer, Row, Spacer, StandardButton, Text, VerticalSpacer } from "../../../../../components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${EdgeInsets.all(Dimensions.regular)};
  background-color: ${(props): string =>
    props.theme.colorScheme.surface
  };
`

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background-color: ${(props): string =>
    props.theme.colorScheme.primaryContainer
  };
`

export interface PaymentDetailsSheetProps {
  open: boolean
  payment: Payment
  onClose?: () => void
}

export function PaymentDetailsSheet({
  open,
  payment,
  onClose,
}: PaymentDetailsSheetProps): JSX.Element {

  const theme = useTheme()

  return (
    <BottomSheet
      open={ open }
      onClose={ onClose }
      title='Payment details'>
        <Container>
          <Row>
            <Spacer>
              <Column>
                <Text
                  text={ payment.identifier }
                  style={ theme.textTheme.titleLarge } />
                <Text
                  text={ `${payment.method} payment` }
                  style={ theme.textTheme.labelMedium }
                  color={ theme.colorScheme.onSurface } />
              </Column>
            </Spacer>
            <HorizontalSpacer width={ Dimensions.regular } />
            <Avatar>
              <Text
                text={ PresentationHelper.formatPaymetIdentifier(payment.identifier) }
                style={ theme.textTheme.titleLarge?.copyWith({
                  height: 2
                }) }
                color={ theme.colorScheme.onPrimary } />
            </Avatar>
          </Row>
          <Divider margin={ EdgeInsets.symmetric({
            vertical: Dimensions.regular
          })} />
          <Row justifyContent='space-between'>
            <Text
              text={ 'Subtotal' }
              style={ theme.textTheme.bodyMedium }
              color={ theme.colorScheme.onSurface } />
            <Text
              text={ PresentationHelper.formatCurrency(payment.total - payment.tip) }
              style={ theme.textTheme.bodyMedium }
              color={ theme.colorScheme.onSurface } />
          </Row>
          <VerticalSpacer height={ Dimensions.extraExtraSmall } />
          <Row justifyContent='space-between'>
            <Text
              text={ 'Tip' }
              style={ theme.textTheme.bodyMedium }
              color={ theme.colorScheme.onSurface } />
            <Text
              text={ PresentationHelper.formatCurrency(payment.tip) }
              style={ theme.textTheme.bodyMedium }
              color={ theme.colorScheme.onSurface } />
          </Row>
          <Divider margin={ EdgeInsets.symmetric({
            vertical: Dimensions.regular
          })} />
          <Row justifyContent='space-between'>
            <Text
              text={ 'Total' }
              style={ theme.textTheme.bodyMedium }
              color={ theme.colorScheme.onSurface } />
            <Text
              text={ PresentationHelper.formatCurrency(payment.total) }
              style={ theme.textTheme.bodyMedium }
              color={ theme.colorScheme.onSurface } />
          </Row>
          <VerticalSpacer height={ Dimensions.large } />
          <StandardButton
            text='Close'
            onClick={ onClose } />
        </Container>
    </BottomSheet>
  )
}