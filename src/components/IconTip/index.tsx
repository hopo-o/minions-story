import * as React from 'react'
import Tooltip from 'antd/es/tooltip'
import Icon from 'antd/es/icon'

import './index.styl'

export interface IconTipProps {
  type?: 'primary' | 'error'
  title: string
}


/**
 *  @version 1.0.3
 *  @author hopo
 *  @description 信息提示图标
 */

export default class IconTip extends React.Component <IconTipProps, {}> {
  static defaultProps = {
    type: 'primary',
    style: {}
  }

  render () {
    const { title, type } = this.props

    const classes = 'minions-icon-tip ' + type

    return (
      <Tooltip
        placement="right"
        title={ title }
      >
        <Icon
          type="info-circle"
          theme="filled"
          className={ classes }
        />
      </Tooltip>
    )
  }
}
