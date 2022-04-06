import { ReactNode } from "react"
import Sheet from 'react-modal-sheet'
import styled from "styled-components"
import { ModalAppBar } from "../navigation"

const CustomSheet = styled(Sheet)`
  margin: 0 auto;
  .react-modal-sheet-container {
    background-color: ${(props): string =>
      props.theme.colorScheme.surface
    } !important;
    max-height: 95vh;
    height: auto !important;
    box-shadow: none !important;
  }
`

export interface BottomSheetProps {
  open: boolean
  title: string
  children?: ReactNode
  onOpenEnd?: () => void
  onClose?: () => void
}

export function BottomSheet({
  open,
  title,
  children,
  onOpenEnd,
  onClose,
}: BottomSheetProps): JSX.Element {

  const _handleOnClose = (): void => {
    onClose?.()
  }


  return (
    <CustomSheet
      isOpen={ open }
      onOpenEnd={ onOpenEnd }
      onClose={ _handleOnClose } >
      <CustomSheet.Container onViewportBoxUpdate={() => {}}>
        <CustomSheet.Header onViewportBoxUpdate={() => {}}>
          <ModalAppBar
            title={ title }
            onClose={ _handleOnClose } />
        </CustomSheet.Header>
        <CustomSheet.Content onViewportBoxUpdate={() => {}}>
          { children } 
        </CustomSheet.Content>
      </CustomSheet.Container>
      <Sheet.Backdrop onViewportBoxUpdate={() => {}} />
    </CustomSheet>
  )
}