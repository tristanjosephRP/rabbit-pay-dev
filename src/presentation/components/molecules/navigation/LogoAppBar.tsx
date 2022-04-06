import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../resources"
import { Text } from "../.."
import { HorizontalSpacer, LogoIcon } from "../../atoms"
import { ReactNode } from "react"

const AppBar = styled.div<LogoAppBarProps>`
  width: 100%;
  min-height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props): string =>
    props.color ?? props.theme.colorScheme.background
  };
  padding: ${EdgeInsets.symmetric({
    horizontal: Dimensions.regular
  })};
  border-bottom: ${(props): string | null => 
    props.showDivider
    ? `1px solid  ${props.theme.colorScheme.outline}`
    : null
  };
`

export interface LogoAppBarProps {
  color?: string
  showDivider?: boolean
  children?: ReactNode
}

export function LogoAppBar({
  color,
  showDivider = false,
  children
}: LogoAppBarProps): JSX.Element {

  const themeData = useTheme()

  return (
    <AppBar color={ color } showDivider={ showDivider } >
      <LogoIcon />
      <HorizontalSpacer width={Dimensions.extraSmall} />
      <Text
        text='RabbitPay'
        style={ themeData.textTheme.titleMedium.copyWith({height: 0}) } />
      <HorizontalSpacer width={ Dimensions.regular } />
      { children } 
    </AppBar>
  )
}