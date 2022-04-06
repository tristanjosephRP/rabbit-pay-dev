import styled, { useTheme } from "styled-components"
import { Dimensions } from "../../../../resources"
import { IconsEnum } from "../../../../resources/icons"
import { HorizontalSpacer, IconButton, Text } from "../.."

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const ValueContainer = styled.div`
  width: 100px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export interface StepperProps {
  value: number
  displayValue?: string
  min?: number
  max?: number
  onChange: (value: number) => void
}

export function Stepper({
  value,
  displayValue,
  min = 0,
  max = 99,
  onChange,
}: StepperProps): JSX.Element {

  const theme = useTheme()

  const _handleOnIncremennt = (): void => {
    if (!max || value < max) {
      onChange(value + 1)
    }
  }

  const _handleOnDecrement = (): void => {
    if (value > min ?? 0) {
      onChange(value - 1)
    }
  }

  return (
    <Container>
      <IconButton
        icon={ IconsEnum.minus }
        size={ Dimensions.iconRegular }
        outline
        backgroundColor={ theme.colorScheme.surfaceVariant }
        onClick={ _handleOnDecrement } />
      <HorizontalSpacer width={ Dimensions.regular } />
      <ValueContainer>
        <Text
          text={ displayValue ?? value.toString() }
          style={ theme.textTheme.displaySmall } />
      </ValueContainer>
      <HorizontalSpacer width={ Dimensions.regular } />
      <IconButton
        icon={ IconsEnum.plus }
        size={ Dimensions.iconRegular }
        outline
        backgroundColor={ theme.colorScheme.surfaceVariant }
        onClick={ _handleOnIncremennt } />
    </Container>
  )
}