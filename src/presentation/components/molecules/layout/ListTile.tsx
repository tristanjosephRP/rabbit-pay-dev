import styled, { useTheme } from 'styled-components'
import { CSS, Dimensions, EdgeInsets, TextStyle, ThemeUtil } from '../../../../resources'
import { Text } from '../../../components'
import { If, Then } from 'react-if'
import { Spacer } from '../../atoms'

const RowContainer = styled.div<{
  minHeight: string
  active: boolean,
  isClickable: boolean,
}>`
  max-width: 100%;
  min-height: ${(props): string => props.minHeight};
  background-color: ${(props): string => 
    props.active 
    ? props.theme.colorScheme.primaryHover 
    : 'transparent'
  };
  padding: ${EdgeInsets.all(Dimensions.extraSmall)};
  margin: ${EdgeInsets.symmetric({
    horizontal: Dimensions.extraSmall,
    vertical: Dimensions.extraExtraSmall,
  })};
  border-radius: ${(props): string =>
    props.theme.inputTheme.borderRadius
  };
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor:  ${(props): string => 
    props.isClickable 
    ? 'pointer'
    : 'mouse'
  };

  &:hover {
    ${(props): CSS => ThemeUtil.responsiveProperty('background-color', {
      mobile: props.active
        ? props.theme.colorScheme.primaryHover
        : 'transparent',
      tablet: props.isClickable || props.active
        ? props.theme.colorScheme.primaryHover
        : 'transparent',
    })
  }
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .list-tile-title {
    overflow-wrap: break-word;
  }
`

const LeadingContainer = styled.div`
  padding: ${EdgeInsets.fromTRBL({right: Dimensions.extraSmall})};
`

const TrailingContainer = styled.div`
  padding: ${EdgeInsets.fromTRBL({left: Dimensions.extraSmall})};
`

const SubtitleContainer = styled.div``

export interface ListTileProps {
  title: string
  subtitle?: string
  leading?: JSX.Element
  trailing?: JSX.Element
  minHeight?: string
  active?: boolean
  titleStyle?: TextStyle
  subtitleStyle?: TextStyle
  onClick?: () => void
}

export function ListTile({
  title,
  subtitle,
  leading,
  trailing,
  minHeight = '40px',
  active = false,
  titleStyle,
  subtitleStyle,
  onClick
}: ListTileProps ): JSX.Element {

  const themeData = useTheme()

  const _handleOnClick = (): void => {
    onClick?.()
  }

  return (
    <RowContainer
      minHeight={ minHeight }
      active={ active }
      isClickable={ !!onClick }
      onClick={ _handleOnClick } >
      <If condition={ !!leading }>
        <Then>
          <LeadingContainer>
            { leading }
          </LeadingContainer>
        </Then>
      </If>
      <ColumnContainer>
        <Text
          text={ title }
          style={ titleStyle ?? themeData.textTheme.titleSmall.copyWith({
            height: 0
          })}
          color={ themeData.colorScheme.onBackground } />
        <If condition={ !!subtitle }>
          <Then>
            <SubtitleContainer>
              <Text
                text={ subtitle! }
                style={ subtitleStyle ?? themeData.textTheme.labelSmall.copyWith({
                  height: 0
                }) }
                color={ themeData.colorScheme.onSurface } />
            </SubtitleContainer>
          </Then>
        </If>
      </ColumnContainer>
      <Spacer />
      <If condition={ !!trailing }>
        <Then>
          <TrailingContainer>
            { trailing }
          </TrailingContainer>
        </Then>
      </If>
    </RowContainer>
  )
}