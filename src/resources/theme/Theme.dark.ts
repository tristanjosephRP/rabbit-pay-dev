import { DefaultTheme } from 'styled-components'
import { BaseTheme, Brightness } from '.'
import { AppColoursDark } from '../colors/AppColours.dark'

export const darkTheme: DefaultTheme = new BaseTheme({
  brightness: Brightness.dark,
  colorScheme: AppColoursDark.instance
})
