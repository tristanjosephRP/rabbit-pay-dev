import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../resources"
import { HorizontalSpacer, Spacer, Text, IconButton } from "../../atoms"
import { IconsEnum } from "../../../../resources/icons"

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
        style={ themeData.textTheme.labelLarge.copyWith({height: 3}) } />
      <Spacer />
      <IconButton
        icon={ IconsEnum.close }
        onClick={ _handleOnClose } />
    </Container>
  )
}