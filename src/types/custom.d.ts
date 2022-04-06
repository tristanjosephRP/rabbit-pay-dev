import 'styled-components'
import { AppTheme } from '../resources'

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}