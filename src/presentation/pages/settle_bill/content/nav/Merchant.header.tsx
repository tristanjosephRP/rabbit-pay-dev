import { RefObject } from "react"
import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../resources"
import { Text, VerticalSpacer } from "../../../../components"
import { useBill } from "../../provider"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${EdgeInsets.fromTRBL({
    top: '0',
    bottom: Dimensions.regular,
    right: Dimensions.regular,
    left: Dimensions.regular,
  })};
  background-color: ${(props): string =>
    props.theme.colorScheme.appBarBackground
  };
  border-bottom: ${(props): string => 
    props.theme.isDarkMode
      ? `1px solid ${props.theme.colorScheme.surfaceVariant}`
      : 'none'
  };
`
  

export interface MerchantHeaderProps {
  ref?: RefObject<HTMLDivElement>
}

export function MerchantHeader({ ref }: MerchantHeaderProps): JSX.Element {

  const themeData = useTheme()
  const { state: bill } = useBill()
  const labelStyle = themeData.textTheme.labelMedium.copyWith({
    height: 1.5
  })

  return (
    <Container ref={ ref }>
      <Text
        text={ `Table ${bill.tableNumber}` }
        style={ labelStyle }
        color={ themeData.colorScheme.onPrimary } />
      <VerticalSpacer height={ Dimensions.extraExtraSmall }  />
      <Text
        text={ bill.restaurantName }
        style={ themeData.textTheme.headlineSmall } 
        color={ themeData.colorScheme.onPrimary } />
    </Container>
  )
}