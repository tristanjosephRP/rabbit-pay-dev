import { AppleIcon } from './Apple.icon'
import { BookmarkIcon } from './Bookmark.icon'
import { BurgerIcon } from './Burger.icon'
import { ApplePayCC } from './CCApplePay.icon'
import { CCMastercard } from './CCMastercard.icon'
import { CCVisa } from './CCVisa.icon'
import { ChevronDownIcon } from './ChevronDown.icon'
import { ChevronLeftIcon } from './ChevronLeft.icon'
import { ChevronRightIcon } from './ChevronRight.icon'
import { ChevronUpIcon } from './ChevronUp.icon'
import { CircleCheckIcon } from './CircleCheck.icon'
import { CloseIcon } from './Close.icon'
import { CreditCard } from './CreditCard.icon'
import { MinusIcon } from './Minus.icon'
import { PenIcon } from './Pen.icon'
import { PlusIcon } from './Plus.icon'
import { SearchIcon } from './Search.icon'

export enum IconsEnum {
  apple,
  bookmark,
  burger,
  ccApplePay,
  ccMastercard,
  ccVisa,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  circleCheck,
  close,
  creditCard,
  minus,
  pen,
  plus,
  search,
}

export const getIcon = (icon: IconsEnum, color: string, filled?: boolean): JSX.Element => {

  switch (icon) {
    case IconsEnum.apple:
      return <AppleIcon color={ color } />
    case IconsEnum.bookmark:
      return <BookmarkIcon color={ color } />
    case IconsEnum.burger:
      return <BurgerIcon color={ color } />
    case IconsEnum.ccApplePay:
      return <ApplePayCC color={ color } />
    case IconsEnum.ccMastercard:
      return <CCMastercard color={ color } />
    case IconsEnum.ccVisa:
      return <CCVisa color={ color } />
    case IconsEnum.chevronDown:
      return <ChevronDownIcon color={ color } />
    case IconsEnum.chevronLeft:
      return <ChevronLeftIcon color={ color } />
    case IconsEnum.chevronRight:
      return <ChevronRightIcon color={ color } />
    case IconsEnum.chevronUp:
      return <ChevronUpIcon color={ color } />
    case IconsEnum.circleCheck:
      return <CircleCheckIcon color={ color } />
    case IconsEnum.close:
      return <CloseIcon color={ color } />
    case IconsEnum.creditCard:
      return <CreditCard color={ color } />
    case IconsEnum.minus:
      return <MinusIcon color={ color } />
    case IconsEnum.pen:
      return <PenIcon color={ color } />
    case IconsEnum.plus:
      return <PlusIcon color={ color } />
    case IconsEnum.search:
      return <SearchIcon color={ color } />
  }
}
