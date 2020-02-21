import * as React from 'react';
import classNames from 'classnames'
import { Input } from 'antd'
import { CityType, DistrictType, BizcircleType, AddressType } from './type'
import AddressPanel, { address2string } from './Panel'

import './index.styl'

interface IProps {
  cityList        : Array<CityType>
  value           : AddressType
  onChange        : (address: AddressType) => void
  disabled?       : boolean
  requestDistrict : (address: AddressType) => Promise<DistrictType[]>
  requestBizcircle: (address: AddressType) => Promise<BizcircleType[]>
}

interface IState {
  isDropdown: boolean
}

export default class AddressSelect extends React.PureComponent<IProps, IState>{
  state = {
    isDropdown: false,
  }

  selectRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    window.addEventListener('click', this.handleClickWindow)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.handleClickWindow)
  }

  dropdown = () => {
    const { isDropdown } = this.state
    if(!isDropdown) {
      this.setState({ isDropdown: true })
    }
  }

  dropUp = () => {
    const { isDropdown } = this.state
    if(isDropdown) {
      this.setState({ isDropdown: false })
    }
  }

  handleClickWindow = (event: MouseEvent) => {
    const { isDropdown } = this.state
    const target = event.target as HTMLElement
    if(
      isDropdown && 
      !this.selectRef.current.contains(target)
    ) {
      this.dropUp()
    }
  }

  handleFocusInput = this.dropdown

  // handleBlurInput = this.dropUp

  handleChange = (address: AddressType) => {
    this.dropUp()
    this.props.onChange(address)
  }

  
  render() {
    const {
      isDropdown
    } = this.state

    const {
      cityList,
      value,
      disabled,
    } = this.props
    
    const cls = classNames('saas-adselect', {
      ['dropdown'] : isDropdown
    })
    return (
      <div className={ cls } ref={ this.selectRef }>
        <Input
          disabled={ disabled }
          onFocus={ this.handleFocusInput }
          // onBlur={ this.handleBlurInput }
          value={ address2string(value) }
        />
        <AddressPanel
          address={ value }
          cityOptions={ cityList }
          onConfirm={ this.handleChange }
          onCancel={ this.dropUp }
          requestDistrict={ this.props.requestDistrict }
          requestBizcircle={ this.props.requestBizcircle }
        />
      </div>
    );
  }
}
