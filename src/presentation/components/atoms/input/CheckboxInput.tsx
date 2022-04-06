import { If, Then } from 'react-if'
import styled, { useTheme } from 'styled-components'
import { Text } from '..'
import { CSS, Dimensions, ThemeUtil } from '../../../../resources'
import { IconsEnum } from '../../../../resources/icons'
import { Icon } from '../icons'
import { HorizontalSpacer } from '../layout'

const RowContainer = styled.div<{ width: string }>`
  width: ${(props): string => props.width};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${ThemeUtil.buttonStyle()}
`

const Input = styled.div<{active: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border:  ${(props): string | null =>
    props.active
    ? null
    : `1.5px solid ${props.theme.colorScheme.outline}`
  };
  background-color: ${(props): string =>
    props.active
    ? props.theme.colorScheme.button
    : 'transparent'
  };
`

export interface CheckboxInputProps {
  text: string
  active?: boolean
  width?: string
  disabled?: boolean
  onChanged?: (value: boolean) => void
}

export function CheckboxInput({
  text,
  active = false,
  width='100%',
  disabled = false,
  onChanged,
} : CheckboxInputProps ): JSX.Element {

  const theme = useTheme()

  const _handleOnChanged = (): void => {
    onChanged?.(active)
  }

  return (
    <RowContainer width={ width! } onClick={ _handleOnChanged }>
      <Text
        text={ text }
        style={ theme.textTheme.bodyMedium?.copyWith({
          height: 1.5
        }) } />
      <HorizontalSpacer width={ Dimensions.regular } />
      <Input
        active={ active }
        onClick={ _handleOnChanged }>
        <If condition={ active } >
          <Then>
            <Icon
              icon={IconsEnum.plus}
              color={ theme.colorScheme.onPrimary }
              size={ Dimensions.iconSmall } />
          </Then>
        </If>
      </Input>
    </RowContainer>
  )
}
