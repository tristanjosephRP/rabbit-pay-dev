import { Field, Form, Formik, FormikProps } from "formik"
import { useRef } from "react"
import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../resources"
import { BaseContainer, StandardButton, Text, TextInput, VerticalSpacer } from "../../../../components"

const ButtonBar = styled.div`
  width: 100%;
  position: fixed;
  bottom: env(safe-area-inset-bottom, 0);
  padding: ${EdgeInsets.all(Dimensions.regular)};
`

interface EnterNameFormData {
  name: string
}

export interface EnterNameFormProps {
  onSubmit?: (name: string) => void
}

export function EnterNameForm({
  onSubmit,
}: EnterNameFormProps): JSX.Element {

  const theme = useTheme()
  const formRef = useRef<FormikProps<EnterNameFormData>>(null)
  const formValues: EnterNameFormData = {
    name: '',
  }

  const _handleSubmit = (values: EnterNameFormData): void => {
    if (values.name && values.name !== '') {
      onSubmit?.(values.name)
    }
  }

  return (
    <>
      <BaseContainer padding={ EdgeInsets.fromTRBL({
        left: Dimensions.regular,
        right: Dimensions.regular,
        top: Dimensions.regular,
        bottom: '76px'
      })} >
        <Formik
          innerRef={ formRef }
          initialValues={ formValues }
          onSubmit={ _handleSubmit } >
          <Form>
            <Text
              text='Enter your name'
              style={ theme.textTheme.titleSmall }
              color={ theme.colorScheme.onSurface } />
            <VerticalSpacer height={ Dimensions.regular } />
            <Field
              as={ TextInput }
              name='name'
              type='text'
              placeholder='John Doe' />
          </Form>
        </Formik>
      </BaseContainer>
      <ButtonBar>
        <StandardButton
          text='Continue'
          onClick={ () => formRef.current?.submitForm() } />
      </ButtonBar>
    </>
  )
}