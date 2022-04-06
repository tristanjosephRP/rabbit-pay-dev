import { AppTheme, Brightness, IInputTheme } from '.'
import { Dimensions } from '..'
import { IColorScheme } from '../colors'
import { AppTextStyles, ITextTheme } from '../text'
import { ThemeUtil, BreakpointSizeMap } from '../utility'


export class BaseTheme implements AppTheme {

  constructor(input: { 
    brightness: Brightness,
    colorScheme: IColorScheme 
  }) {
    this.brightness = input.brightness
    this.colorScheme = input.colorScheme
    this.isDarkMode = this.brightness === Brightness.dark
    this.isLightMode = this.brightness === Brightness.dark
  }

  public brightness: Brightness

  public colorScheme: IColorScheme

  public textTheme: ITextTheme = AppTextStyles.instance

  public inputTheme: IInputTheme = {
    borderRadius: Dimensions.extraSmall,
    height: '44px',
  }

  public maxWidth: number = ThemeUtil.MAX_WIDTH

  public screenWidth = (): number => {
    if (typeof window === 'undefined') {
      return ThemeUtil.MAX_WIDTH
    }
    return document.documentElement.clientWidth
  }

  public isMobile = (): boolean => {
    if (typeof window === 'undefined') {
      return true
    } else {
      if (document.documentElement.clientWidth < ThemeUtil.breakpointSize.tablet) {
        return true
      }
      return false
    }
  }

  public isTablet = (): boolean => {
    if (typeof window === 'undefined') {
      return false
    } else {
      if (
        document.documentElement.clientWidth >= ThemeUtil.breakpointSize.tablet &&
        document.documentElement.clientWidth < ThemeUtil.breakpointSize.desktop
      ) {
        return true
      }
      return false
    }
  }

  public isDesktop = (): boolean => {
    if (typeof window === 'undefined') {
      return false
    } else {
      if (document.documentElement.clientWidth >= ThemeUtil.breakpointSize.desktop) {
        return true
      }
      return false
    }
  }

  public isDarkMode: boolean

  public isLightMode: boolean

  public breakpointSize: BreakpointSizeMap = ThemeUtil.breakpointSize
} 
