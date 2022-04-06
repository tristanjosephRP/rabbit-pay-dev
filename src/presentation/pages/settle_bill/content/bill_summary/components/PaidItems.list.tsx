import styled, { useTheme } from "styled-components"
import { Dimensions, EdgeInsets } from "../../../../../../resources"
import { Divider, HorizontalSpacer, Icon, Spacer, Text } from "../../../../../components"
import { IconsEnum } from "../../../../../../resources/icons"
import { useState } from "react"
import { BillItemTile } from "./Bill.tile"
import { ChosenSaleEntry } from "../../../provider"

const Row = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${EdgeInsets.symmetric({
    horizontal: Dimensions.regular
  })};
`

const ItemsContainer = styled.div<{ hidden: boolean }>`
  display: ${(props): string => props.hidden
    ? 'none'
    : 'block'
  }
`

export interface PaidItemsListProps {
  items: ChosenSaleEntry[]
}

export function PaidItemsList({
  items,
}: PaidItemsListProps): JSX.Element {

  const themeData = useTheme()
  const [ showItems, setShowItems ] = useState<boolean>(false)

  return (
    <>
      <Row onClick={ () => setShowItems(!showItems) }>
        <Text
          text={ `Paid items (${items.length})` }
          style={ themeData.textTheme.labelLarge.copyWith({
            height: 0
          })} />
        <HorizontalSpacer width={ Dimensions.extraSmall } />
        <Spacer />
        <Icon
          icon={ showItems
            ? IconsEnum.chevronUp
            : IconsEnum.chevronDown 
          }
          size={ Dimensions.iconSmall } />
      </Row>
      <ItemsContainer hidden={ !showItems }>
        <Divider margin={ EdgeInsets.fromTRBL({
          bottom: Dimensions.extraSmall,
          left: Dimensions.regular,
          right: Dimensions.regular,
        })} />
        { items.map((billItem: ChosenSaleEntry, index: number) => {
          return <BillItemTile
            key={ `paid_item_${index}` }
            item={ billItem } />
        })}
      </ItemsContainer>
    </>
  )
}