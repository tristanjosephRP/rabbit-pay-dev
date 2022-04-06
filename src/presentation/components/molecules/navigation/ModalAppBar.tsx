import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../resources"
import { HorizontalSpacer, Spacer, Text, IconButton } from "../../atoms"
import { IconsEnum } from "../../../../resources/icons"

const Container = styled.div`
  background-color: ${(props): string =>
    props.theme.colorScheme.surface
  };
  width: 100%;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  align-items: center;
  padding: ${EdgeInsets.symmetric({ 
    horizontal: Dimensions.regular
  })};
  border-bottom:  ${(props): string | null =>
    props.theme.isDarkMode 
      ? `0.5px solid ${props.theme.colorScheme.outline}`
      : `1px solid ${props.theme.colorScheme.outline}`
  };
  border-top-right-radius: ${Dimensions.extraSmall} !important;
  border-top-left-radius: ${Dimensions.extraSmall} !important;
  overflow: clip !important;
`

export interface ModalAppBarProps {
  title: string
  onClose?: () => void
}

export function ModalAppBar({ title, onClose }: ModalAppBarProps): JSX.Element {

  const themeData = useTheme()

  const _handleOnClose = (): void => {
    onClose?.()
  }

  return (
    <Container>
      <HorizontalSpacer width='20px' />
      <Spacer />
      <Text
        text={ title }
        style={ themeData.textTheme.labelLarge.copyWith({height: 2}) } />
      <Spacer />
      <IconButton
        icon={ IconsEnum.close }
        onClick={ _handleOnClose } />
    </Container>
  )
}