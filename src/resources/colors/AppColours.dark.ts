import Color from "ts-color-class"
import { IColorScheme } from "."

export class AppColoursDark implements IColorScheme {

  private static _instance: AppColoursDark

  public static get instance(): AppColoursDark {
    if (!AppColoursDark._instance) {
      AppColoursDark._instance = new AppColoursDark()
    }
    return AppColoursDark._instance
  }

  primary: string = '#157A6B'
  primaryContainer: string = '#21C0A8'
  primaryHover: string = new Color('#157A6B').alpha(0.56).toString()
  onPrimary: string = '#FFFFFF'

  secondary: string = '#52489C'
  secondaryContainer: string = '#7C73BF'
  secondaryHover: string = new Color('#52489C').alpha(0.56).toString()
  onSecondary: string = '#FFFFFF'

  tertiary: string = '#2B76A1'
  tertiaryContainer: string = '#6DB2D9'
  tertiaryHover: string = '#AED4EA'
  onTertiary: string = '#FFFFFF'

  error: string = '#E71D36'
  onError: string = '#FFFFFF'

  background: string = '#131316'
  onBackground: string = '#F4F4F4'

  surface: string = '#1C1C21'
  onSurface: string = '#929292'

  surfaceVariant: string = '#2F2F37'
  onSurfaceVariant: string = '#595959'

  outline: string = '#676766'

  shadow: string = 'none'

  hover: string = new Color('#157A6B').alpha(0.56).toString()

  button: string = '#F4F4F4'

  // Green
  support01: string = '#157A6B'
  // Yellow
  support02: string = '#FBFF0A'
  // Blue
  support03: string = '#758BFD'

  // Purple
  neutral01: string = '#D8D5EC'

  lightText: string = '#FFFFFF'
  darkText: string = '#1F1F1F'
  appBarBackground: string = '#1C1C21'

}