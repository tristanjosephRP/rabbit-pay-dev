import { css, DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components"

export type CSS = FlattenInterpolation<ThemeProps<DefaultTheme>> | string | null

export type BreakpointSizeMap = { [k: string]: number } 

export interface HoverStyle {
  backgroundColor?: string
  borderColor?: string
  borderWeight?: string
  opacity?: number
  padding?: string
}

export interface FormFactor {
  mobile?: string
  tablet?: string
  desktop?: string
  ultra?: string | number
}

export enum BoxShadowType {
  LIGHT,
  MEDIUM,
  STRONG
}

export class ThemeUtil {

  static MAX_WIDTH = 1280

  static breakpointSize: BreakpointSizeMap = {
    ultra: ThemeUtil.MAX_WIDTH,
    desktop: 1024,
    tablet: 768,
    mobile: 480,
  }

  static boxShadow = (input: { type: BoxShadowType, color: string }): CSS => css`
    ${input.type === BoxShadowType.LIGHT
      ? `box-shadow: 0px 2px 8px 2px ${input.color};`
      : input.type === BoxShadowType.MEDIUM
        ? `box-shadow: 0px 2px 4px 1px ${input.color};`
        : `box-shadow: 0px 4px 8px 4px ${input.color};`}
  `

  static buttonStyle = (input?: {
    outline?: boolean
    hoverStyle?: HoverStyle,
  }): CSS => css`
    transition: 0.1s all;
    :active {
      transform: scale(0.98);
      opacity: ${input?.outline ? 1 : input?.hoverStyle?.opacity ?? 0.9};
    }

    @media screen and (min-width: ${ThemeUtil.breakpointSize.tablet}px) {
      :hover {
        opacity: ${input?.outline ? 1 : input?.hoverStyle?.opacity ?? 0.7};
        background-color: ${input?.outline ? input.hoverStyle?.backgroundColor : null};
        border: ${input?.outline
          ? `${input?.hoverStyle?.borderWeight ?? '1px'} solid ${input?.hoverStyle?.borderColor}`
          : null };
        padding: ${input?.hoverStyle?.padding ?? 'inherit'};
      }
    }
  `

  static responsiveProperty = (prop: string, value: FormFactor): CSS => css`

    ${prop}: ${value?.mobile ?? 'initial'};

    @media screen and (min-width: ${ThemeUtil.breakpointSize.tablet}px) {
      ${prop}: ${value?.tablet ?? value?.mobile ?? 'initial'};
    }

    @media screen and (min-width: ${ThemeUtil.breakpointSize.desktop}px) {
      ${prop}: ${value?.desktop ?? value?.tablet ?? value?.mobile ?? 'initial'};
    }

    @media screen and (min-width: ${ThemeUtil.breakpointSize.ultra}px) {
      ${prop}: ${value?.ultra ?? value?.desktop ?? value?.tablet ?? value?.mobile ?? 'initial'};
    }
  `
}