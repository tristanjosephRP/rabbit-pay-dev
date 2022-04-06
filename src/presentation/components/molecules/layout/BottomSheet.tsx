import { ReactNode } from "react"
import * as bs from 'react-spring-bottom-sheet'
import { ModalAppBar } from "../navigation"
import 'react-spring-bottom-sheet/dist/style.css'
import './BottomSheet.css'

export interface BottomSheetProps {
  open: boolean
  title: string
  children?: ReactNode
  onClose?: () => void
}

export function BottomSheet({
  open,
  title,
  children,
  onClose,
}: BottomSheetProps): JSX.Element {

  const _handleOnClose = (): void => {
    onClose?.()
  }

  const $header = (
    <ModalAppBar
      title={ title }
      onClose={ _handleOnClose } />
  )


  return (
    <bs.BottomSheet
      open={open}
      onDismiss={ _handleOnClose }
      header={ $header }>
        { children } 
    </bs.BottomSheet>
  )
}