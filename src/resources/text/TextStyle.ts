import { FontWeight } from "."

export interface ITextStyle {
  typeface?: string
  weight?: FontWeight
  size?: number
  case?: 'lowercase' | 'uppercase' | 'capitalize' | 'none'
  letterSpacing?: number
  height?: number
}

export class TextStyle implements ITextStyle {

  constructor (params: ITextStyle) {
    this.typeface = params.typeface
    this.weight = params.weight ?? FontWeight.regular
    this.size = params.size ?? 16
    this.case = params.case ?? 'none'
    this.letterSpacing = params.letterSpacing ?? 1
    this.height = params.height ?? 1.5
  }

  public typeface?: string

  public weight!: FontWeight

  public size!: number

  public case!: 'lowercase' | 'uppercase' | 'capitalize' | 'none'

  public letterSpacing!: number

  public height!: number

  public copyWith = (params: ITextStyle): TextStyle => {
    return new TextStyle({
      typeface: params.typeface ?? this.typeface,
      weight: params.weight ?? this.weight,
      size: params.size ?? this.size,
      case: params.case ?? this.case,
      letterSpacing: params.letterSpacing ?? this.letterSpacing,
      height: params.height ?? this.height,
    })
  }
}