export enum CurrencyEnum {
  ZAR = 'ZAR',
  GBP = 'GBP',
}

export class PresentationHelper {

  public static formatCurrency = (unitAmount: number, currency?: CurrencyEnum): string => {
    return (unitAmount/100).toLocaleString('en-ZA', {
      style: 'currency',
      currency: currency ?? 'ZAR',
    })
  }

  public static formatPaymetIdentifier = (identidier: string): string => {
    return identidier.split(' ')?.reduce((value: string, curr: string) =>
      value + curr.charAt(0).toUpperCase(), ''
    )
  }
}