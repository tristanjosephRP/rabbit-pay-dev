import { useState } from "react"
import styled from "styled-components"
import { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../resources"
import { BaseContainer, Text, VerticalSpacer } from "../../../../components"
import { BillActionEnum, useBill } from "../../provider"
import { CustomTipButton } from "./CustomTip.button"
import { TipButton } from "./Tip.button"
import { TipStepperSheet } from "./TipStepper.sheet"

const TipsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${Dimensions.extraSmall};
`

export interface AddTipBlockProps {}

export function AddTipBlock({}: AddTipBlockProps): JSX.Element {

  const theme = useTheme()
  const { state: bill, dispatch: dispatchBillAction } = useBill()
  const total = bill.totalToPay

  const [open, setOpen] = useState<boolean>(false)

  const tipOptions: number[] = [10, 12, 15, 20]

  const _handleTipChosen = (percent: number): void => {
    dispatchBillAction({
      type: BillActionEnum.addTip,
      percent: percent
    })
  }

  return (
    <>
      <BaseContainer
        display='flex'
        flexDirection='column'
        alignItems='stretch'
        padding={ EdgeInsets.all(Dimensions.regular) }
        backgroundColor={ theme.colorScheme.surface }
        margin={ EdgeInsets.fromTRBL({
          bottom: Dimensions.extraSmall,
        })}>
        <Text
          text='Would you like to add a tip?'
          style={ theme.textTheme.titleMedium }/>
        <VerticalSpacer height={ Dimensions.regular } />
        <TipsRow>
          { tipOptions.map((tip: number, index: number) => {
            return <TipButton
              key={ `tip_option_${index}` }
              width='100%'
              price={ total } 
              percentage={ tip }
              active={ bill.tipPercent === tip && !bill.customTip }
              onClick={ () => _handleTipChosen(tip) } />
          })}
        </TipsRow>
        <VerticalSpacer height={ Dimensions.regular } />
        <CustomTipButton
          active={ bill.customTip }
          tip={ bill.tipPercent }
          onClick={ () => setOpen(true) } />
      </BaseContainer>
      <TipStepperSheet
        open={ open }
        onClose={ () => setOpen(false) } />
    </>
  )
}