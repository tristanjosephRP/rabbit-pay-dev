export interface BookmarkIconProps {
  color?: string
}

export function BookmarkIcon({ color }: BookmarkIconProps): JSX.Element {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width='100%'
      height='100%'
      fill={ color } >
      {/* <!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
      <path d="M384 48V512l-192-112L0 512V48C0 21.5 21.5 0 48 0h288C362.5 0 384 21.5 384 48z"/>
    </svg>
  )
}
