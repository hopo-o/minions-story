import * as React from 'react'
import { Spin as AntSpin, Icon } from 'antd'
import { SpinProps } from 'antd/es/spin'

const styleObj = { fontSize: 24 }

const spinIcon = <Icon type="loading" style={ styleObj } spin />

export const SpinOption: SpinProps = {
  indicator: spinIcon,
  size: 'default'
}

let Spin: React.FunctionComponent<SpinProps>

export default Spin = props => {
  const option = { ...SpinOption, ...props }
  return (
    <AntSpin { ...option } />
  )
}
