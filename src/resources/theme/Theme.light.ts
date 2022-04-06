import { DefaultTheme } from 'styled-components'
import { BaseTheme, Brightness } from '.'
import { AppColoursLight } from '../colors'

export const lighTheme: DefaultTheme = new BaseTheme({
  brightness: Brightness.light,
  colorScheme: AppColoursLight.instance
})
