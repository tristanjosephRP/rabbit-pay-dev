import { If, Then } from "react-if"
import styled, { useTheme } from "styled-components"
import { Dimensions, FontWeight } from "../../../../../../resources"
import { CurrencyEnum, PresentationHelper } from "../../../../../../utils/helpers"
import { HorizontalSpacer, ListTile, Text } from "../../../../../components"
import { ChosenSaleEntry } from "../../../provider"

const QuantityIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: ${Dimensions.extraExtraSmall};
  background-color: ${(props): string =>
    props.theme.colorScheme.surfaceVariant
  };
  display: flex;
  align-items: center;
  justify-content: center;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

export interface BillItemTileProps {
  item: ChosenSaleEntry
  multiline?: boolean
  active?: boolean
  onClick?: () => void
}

export function BillItemTile({
  item,
  multiline = false,
  active = false,
  onClick
}: BillItemTileProps): JSX.Element {

  const themeData = useTheme()
  const quantity = item.chosenQuantity > 0 ? item.chosenQuantity : item.quantity
  const unitAmount: string = PresentationHelper.formatCurrency(item.unit_amount, CurrencyEnum.ZAR)
  const amount: string = PresentationHelper.formatCurrency(item.unit_amount*quantity, CurrencyEnum.ZAR)
  const subtitle: string | undefined = undefined

  const icon = (
    <QuantityIcon>
      <Text
        text={ quantity.toString() }
        style={ themeData.textTheme.labelSmall.copyWith({
          height: 3,
          weight: FontWeight.semiBold
        }) } />
    </QuantityIcon>
  )

  const trailing = (
    <Row>
      <If condition={ item.quantity > 1 }>
        <Then>
          <Text
            text={ `(${unitAmount})` }
            style={ themeData.textTheme.titleSmall.copyWith({ 
              height: 2,
              weight: active
              ? FontWeight.regular
              : FontWeight.light
            })}
            color={ active
              ? themeData.colorScheme.onBackground
              : themeData.colorScheme.onSurface 
            } />
          <HorizontalSpacer width={ Dimensions.extraSmall } />
        </Then>
      </If>
      <Text
        text={ amount }
        style={ themeData.textTheme.titleSmall.copyWith({ 
          height: 2,
          weight: active
            ? FontWeight.medium
            : FontWeight.regular
        })}
        color={ active
          ? themeData.colorScheme.primaryContainer
          : themeData.colorScheme.onBackground 
        } />
    </Row>
  )

  return (
    <ListTile
      leading={ icon }
      title={ item.description }
      titleStyle={ themeData.textTheme.bodyMedium.copyWith({
        height: multiline ? 1.5 : 2,
        weight: active ? FontWeight.medium : FontWeight.light
      })}
      subtitle={ subtitle }
      trailing={ trailing }
      minHeight='44px'
      active={ active }
      onClick={ onClick } />
  )
}