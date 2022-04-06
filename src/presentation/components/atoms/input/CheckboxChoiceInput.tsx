import styled from 'styled-components'
import { Text } from '..'

const ColumnContainer = styled.div<{ width: string }>`
  width: ${(props): string => props.width};
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const RowContainer = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Input = styled.input`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid ${(props): string => props.theme.colorScheme.outline};
  background-color: ${(props): string => props.theme.colorScheme.onBackground};
`

export interface SelectOption {
  text: string
  value: boolean
}

export interface CheckboxInputProps {
  values?: SelectOption[]
  groupName: string
  width?: string
  disabled?: boolean
}

export function CheckboxInput({
  values = [] as SelectOption[],
  groupName,
  width='100%',
  disabled = false }: CheckboxInputProps
): JSX.Element {
  return (
    <ColumnContainer width={ width }>
      {values.map((item, index) => {
        return (
          <RowContainer key={`cb_${groupName}_${index}`}>
            <Text text={ item.text } />
            <Input
              type='checkbox'
              value={ item.value.toString() }
              name={ `cb_${groupName}_${index}` }
              disabled={ disabled } />
          </RowContainer>
        )
      })}
    </ColumnContainer>
  )
}
