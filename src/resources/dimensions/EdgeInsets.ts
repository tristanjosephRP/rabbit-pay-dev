export interface SymmetricInput {
  vertical?: string,
  horizontal?: string
}

export interface TRBLInput {
  top?: string,
  right?: string,
  bottom?: string,
  left?: string
}

export class EdgeInsets {

  static all = (dimension: string): string => {
    return dimension
  }

  static symmetric = (input: SymmetricInput): string => {
    return `${input.vertical ?? 0} ${input.horizontal ?? 0}`
  }

  static fromTRBL = (input: TRBLInput): string => {
    return `${input.top ?? 0} ${input.right ?? 0} ${input.bottom ?? 0} ${input.left ?? 0}`
  }
}