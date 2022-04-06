import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets, ThemeUtil } from "../../../../resources"
import { Text, IconButton } from "../.."
import { HorizontalSpacer } from "../../atoms"
import { IconsEnum } from "../../../../resources/icons"
import { ReactNode } from "react"

const Container = styled.div`
  background-color: ${(props): string =>
    props.theme.colorScheme.background
  };
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${EdgeInsets.symmetric({ 
    horizontal: Dimensions.large
  })};
  background-color: ${(props): string =>
    props.theme.colorScheme.background
  };
  border-bottom: 1px solid ${(props): string =>
    props.theme.colorScheme.outline
  };
`

const MenuIconContainer = styled.div`
  ${ThemeUtil.responsiveProperty('display', {
    mobile: 'flex',
    tablet: 'flex',
    desktop: 'none'
  })};
  padding: ${EdgeInsets.fromTRBL({
    right: Dimensions.extraSmall
  })};
`

export interface AppBarProps {
  title: string
  children?: ReactNode
}

export function AppBar({
  title,
  children 
}: AppBarProps): JSX.Element {

  const themeData = useTheme()

  return (
    <Container>
      <MenuIconContainer>
        <IconButton icon={ IconsEnum.search } />
      </MenuIconContainer>
      <Text
        text={ title }
        style={ themeData.textTheme.labelLarge.copyWith({
          height: 2
        })} />
      <HorizontalSpacer width={ Dimensions.large } />
      { children } 
    </Container>
  )
}