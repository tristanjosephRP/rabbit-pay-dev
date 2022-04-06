import { useState } from "react"
import styled from "styled-components"
import { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../../resources"
import { PresentationHelper } from "../../../../../../utils/helpers"
import { BottomSheet, StandardButton, Text, VerticalSpacer } from "../../../../../components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${EdgeInsets.all(Dimensions.regular)};
  background-color: ${(props): string =>
    props.theme.colorScheme.surface
  };
`

const NumPad = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const Key = styled.div`
  display: flex; 
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 56px;
`

const KeyPress = styled.div`
  display: flex; 
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 100%;
  
  &:active {
    background-color: ${(props): string =>
      props.theme.colorScheme.surfaceVariant
    };
  }
`

export interface CustomAmountSheetProps {
  open: boolean
  maxAmount: number
  onComplete: (amount: number) => void
  onClose?: () => void
}

export function CustomAmountSheet({
  open,
  maxAmount,
  onComplete,
  onClose,
}: CustomAmountSheetProps): JSX.Element {

  const theme = useTheme()
  const [ amount, setAmout ] = useState<string>('0')
  const [ instruction, setInstruction ] = useState<string>('(This amount should not include tip)')
  const keys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '<']

  const _handleOnKeyPressed = (key: string): void => {
    if (key === '<') {
      if (amount.length > 1) {
        setAmout(amount.substring(0, amount.length - 1))
      } else {
        setAmout('0')
      }
    } else {
      setAmout(amount + key)
    }
  }

  const _handleOnSubmit = (): void => {
    const parsedInt = parseInt(amount)
    if (parsedInt > maxAmount) {
      setInstruction(`Amount cannot be greater than ${PresentationHelper.formatCurrency(maxAmount)}`)
    } else {
      setInstruction('(This amount should not include tip)')
      onComplete(parsedInt)
      onClose?.()
    }
  }

  return (
    <BottomSheet
      open={ open }
      onClose={ onClose }
      title='Custom amount'>
        <Container>
          <Text 
            text={ PresentationHelper.formatCurrency(
              parseFloat(amount)
            )}
            style={ theme.textTheme.displayMedium } />
          <VerticalSpacer height={ Dimensions.regular } />
          <Text
            text={ instruction }
            style={ theme.textTheme.labelMedium }
            color={ theme.colorScheme.onSurface } />
          <VerticalSpacer height={ Dimensions.medium } />
          <NumPad>
            { keys.map((key: string, index: number) => {
              return (
                <Key key={ `num_pad_key_${index}` }>
                  <KeyPress onClick={() => _handleOnKeyPressed(key)}>
                    <Text
                      text={ key }
                      style={ theme.textTheme.labelLarge?.copyWith({
                        height: 2
                      })} />
                  </KeyPress>
                </Key>
              )
            })}
          </NumPad>
          <VerticalSpacer height={ Dimensions.medium } />
          <StandardButton
            text='Done'
            onClick={ _handleOnSubmit } />
        </Container>
    </BottomSheet>
  )
}