import { IColorScheme, ITextTheme } from ".."

export enum Brightness {
  light,
  dark,
}

export interface IInputTheme {
  borderRadius: string
  height: string
}

export interface AppTheme {
  brightness: Brightness
  colorScheme: IColorScheme
  textTheme: ITextTheme
  inputTheme: IInputTheme
  maxWidth: number
  screenWidth: () => number
  isMobile: () => boolean
  isTablet: () => boolean
  isDesktop: () => boolean
  isDarkMode: boolean
  isLightMode: boolean
  breakpointSize: { [k: string]: number }
}