import { Field } from "formik"
import { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../resources"
import { BaseContainer, StandardButton, Text, TextButton, TextInput, VerticalSpacer } from "../../../../components"

export interface CheckBillAlertProps {
  onClose?: () => void
  onContinue?: () => void
}

export function CheckBillAlert({
  onClose,
  onContinue,
}: CheckBillAlertProps): JSX.Element {

  const theme = useTheme()

  const _handleClose = (): void => {
    onClose?.()
  }

  const _handleContinue = (): void => {
    onContinue?.()
  }

  return (
    <BaseContainer padding={ EdgeInsets.all(Dimensions.regular)} >
      <Text
        text="Hey, the items on your bill have changed"
        style={ theme.textTheme.headlineSmall } />
      <VerticalSpacer height={ Dimensions.extraSmall } />
      <Text
        text="We've updated your total, would you like to review the changes or just continue?"
        style={ theme.textTheme.bodySmall }
        color={ theme.colorScheme.onSurface } />
      <VerticalSpacer height={ Dimensions.medium } />
      <StandardButton
        text='Continue'
        onClick={ _handleContinue } />
      <VerticalSpacer height={ Dimensions.regular } />
      <TextButton
        text='View changes'
        onClick={ _handleClose } />
      <VerticalSpacer height={ Dimensions.medium } />
    </BaseContainer>
  )
}