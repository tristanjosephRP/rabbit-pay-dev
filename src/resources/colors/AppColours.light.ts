import { IColorScheme } from "."

export class AppColoursLight implements IColorScheme {

  private static _instance: AppColoursLight

  public static get instance(): AppColoursLight {
    if (!AppColoursLight._instance) {
      AppColoursLight._instance = new AppColoursLight()
    }
    return AppColoursLight._instance
  }

  primary: string = '#157A6B'
  primaryContainer: string = '#21C0A8'
  primaryHover: string = '#DBF5F1'
  onPrimary: string = '#FFFFFF'

  secondary: string = '#52489C'
  secondaryContainer: string = '#7C73BF'
  secondaryHover: string = '#D8D5EC'
  onSecondary: string = '#FFFFFF'

  tertiary: string = '#2B76A1'
  tertiaryContainer: string = '#6DB2D9'
  tertiaryHover: string = '#AED4EA'
  onTertiary: string = '#FFFFFF'

  error: string = '#F45B69'
  onError: string = '#FFFFFF'

  background: string = '#FFFFFF'
  onBackground: string = '#1C1C21'

  surface: string = '#FFFFFF'
  onSurface: string = '#717184'

  surfaceVariant: string = '#F4F4F6'
  onSurfaceVariant: string = '#707070'

  outline: string = '#E9E9ED'

  hover: string = '#F4F4F6'

  shadow: string = '#F5F5F5'

  button: string = '#1C1C21'

  // Yellow
  support01: string = '#F5C000'
  // Red
  support02: string = '#D20F1F'
  // Blue
  support03: string = '#758BFD'

  // Purple
  neutral01: string = '#D8D5EC'

  lightText: string = '#FFFFFF'
  darkText: string = '#1C1C21'
  appBarBackground: string = '#1C1C21'

}