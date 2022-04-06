import { FontWeight } from "."
import { TextStyle } from "./TextStyle"

export interface ITextTheme {
  displayLarge: TextStyle
  displayMedium: TextStyle
  displaySmall: TextStyle
  headlineLarge: TextStyle
  headlineMedium: TextStyle
  headlineSmall: TextStyle
  titleLarge: TextStyle
  titleMedium: TextStyle
  titleSmall: TextStyle
  bodyLarge: TextStyle
  bodyMedium: TextStyle
  bodySmall: TextStyle
  labelLarge: TextStyle
  labelMedium: TextStyle
  labelSmall: TextStyle
}

export class AppTextStyles implements ITextTheme {

  private static _instance: AppTextStyles

  public static get instance(): AppTextStyles {
    if (!AppTextStyles._instance) {
      AppTextStyles._instance = new AppTextStyles()
    }
    return AppTextStyles._instance
  }

  displayLarge: TextStyle = new TextStyle({
    weight: FontWeight.bold,
    size: 40,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  displayMedium: TextStyle = new TextStyle({
    weight: FontWeight.medium,
    size: 36,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  displaySmall: TextStyle = new TextStyle({
    weight: FontWeight.regular,
    size: 32,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  headlineLarge: TextStyle = new TextStyle({
    weight: FontWeight.semiBold,
    size: 28,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  headlineMedium: TextStyle = new TextStyle({
    weight: FontWeight.semiBold,
    size: 24,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  headlineSmall: TextStyle = new TextStyle({
    weight: FontWeight.medium,
    size: 20,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  titleLarge: TextStyle = new TextStyle({
    weight: FontWeight.medium,
    size: 18,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  titleMedium: TextStyle = new TextStyle({
    weight: FontWeight.medium,
    size: 16,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  titleSmall: TextStyle = new TextStyle({
    weight: FontWeight.medium,
    size: 14,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  bodyLarge: TextStyle = new TextStyle({
    weight: FontWeight.regular,
    size: 16,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  bodyMedium: TextStyle = new TextStyle({
    weight: FontWeight.light,
    size: 14,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  bodySmall: TextStyle = new TextStyle({
    weight: FontWeight.light,
    size: 12,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  labelLarge: TextStyle = new TextStyle({
    weight: FontWeight.medium,
    size: 14,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  labelMedium: TextStyle = new TextStyle({
    weight: FontWeight.regular,
    size: 12,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })

  labelSmall: TextStyle = new TextStyle({
    weight: FontWeight.light,
    size: 11,
    case: 'none',
    letterSpacing: 0.5,
    height: 1.4
  })
}