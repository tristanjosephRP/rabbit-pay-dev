import { useNavigate } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../resources"
import { IconsEnum } from "../../../../../resources/icons"
import { IconButton } from "../../../../components"
import { useBill } from "../../provider"

const AppBar = styled.div`
  display: flex;
  padding: ${EdgeInsets.all(Dimensions.regular)};
  background-color: ${(props): string =>
    props.theme.colorScheme.appBarBackground
  };
`

export interface AppBarNavProps {}

export function AppBarNav({}: AppBarNavProps): JSX.Element {

  const themeData = useTheme()
  const navigateTo = useNavigate()
  const { state: bill } = useBill()

  const _handleOnCloseClicked = (): void => {
    console.log(bill.tableId)
    navigateTo(`/client/${bill.clientId}/table/${bill.tableId}`)
  }

  return (
    <AppBar>
      <IconButton
        icon={ IconsEnum.chevronLeft }
        size={ Dimensions.iconRegular }
        outline
        backgroundColor={ themeData.colorScheme.background }
        onClick={ _handleOnCloseClicked }  />
    </AppBar>
  )
}