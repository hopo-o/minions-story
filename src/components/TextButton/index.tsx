import * as React from 'react'
import classNames from 'classnames'

import './index.styl'

interface IProps {
  sub?        : string
  active?     : boolean
  disabled?    : boolean
  onClick?    : () => void
  onMouseDown?: () => void
}

let TextButton: React.FunctionComponent<IProps>

export default TextButton = props => {
  const { sub, active, disabled, onClick, children, ...restProps } = props

  const handleClick = disabled ? () => {} :  onClick

  const cls = classNames('saas-text-button',{ avaliable: !disabled, active })

  return (
    <div
      { ...restProps }
      className={ cls }
      role="button"
      onClick={ handleClick }
    >
      <div className="text-button-main">{ children }</div>
      { sub ? <div className="text-button-sub">{ sub }</div> : null }
    </div>
  )
}

TextButton.defaultProps = {
  sub: undefined,
  active: false,
  disabled: false,
  onClick: () => {},
}

