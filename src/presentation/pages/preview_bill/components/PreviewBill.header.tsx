import { useTheme } from 'styled-components'
import { Dimensions, EdgeInsets } from '../../../../resources'
import { Column, Divider, HorizontalSpacer, Icon, Row, Spacer, StandardButton, Text, VerticalSpacer } from '../../../components'
import styled from 'styled-components'
import { Client } from '../../../../network/models'
import { IconsEnum } from '../../../../resources/icons'

const ImageContainer = styled.img`
  width: 96px;
  height: 96px;
  object-fit: contain;
  background-color: ${(props): string =>
    props.theme.colorScheme.lightText
  };
  border-radius: 100%;
  overflow: clip;
`

export interface PreviewBillHeaderProps {
  client?: Client
}

export function PreviewBillHeader({ client }: PreviewBillHeaderProps): JSX.Element {

  const theme = useTheme()

  return (
    <Column
      padding={ EdgeInsets.symmetric({
        horizontal: Dimensions.regular,
        vertical: Dimensions.large
      }) }>
      <ImageContainer src={ client?.logo_url }  />
      <VerticalSpacer height={ Dimensions.medium } />
      <Text
        text={ client?.name ?? 'Client name' }
        style={ theme.textTheme.headlineMedium }
        color={ theme.colorScheme.lightText } />
      <VerticalSpacer height={ Dimensions.regular } />
      <Row height='56px' alignItems='center'>
        <Icon icon={ IconsEnum.burger } color={ theme.colorScheme.lightText } />
        <HorizontalSpacer width={ Dimensions.regular } />
        <Spacer>
          <Text
            text='View the menu'
            style={ theme.textTheme.labelLarge }
            color={ theme.colorScheme.lightText } />
        </Spacer>
        <HorizontalSpacer width={ Dimensions.regular } />
        <Icon icon={ IconsEnum.chevronRight } color={ theme.colorScheme.lightText } />
      </Row>
      <Divider color={ theme.colorScheme.lightText } />
    </Column>
  )
}