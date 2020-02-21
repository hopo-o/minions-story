import * as React from 'react'
import { message, Input } from 'antd'
import { ETime, TDateStatus } from './type'
import * as moment from 'moment'
import classNames from 'classnames'
import Panel, { datetime2string } from './Panel'

import './index.styl'

interface IFreetimeSelectProps {
  date: string
  time: ETime
  requestStatus: (date: string, time?: ETime) => Promise<TDateStatus>
  onChange: (date: string, time: ETime) => void
  force: boolean
  defaultHelp?: string
  disabled?: boolean
}

interface IFreetimeSelectState {
  isDropdown: boolean
  inputValue: string
}

export default class FreetimeSelect extends React.PureComponent<IFreetimeSelectProps, IFreetimeSelectState> {
  state: IFreetimeSelectState = {
    isDropdown: false,
    inputValue: undefined,
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

  handleChange = (date: string, time: ETime, inputValue: string) => {
    this.dropUp()
    this.setState({ inputValue })
    this.props.onChange(date, time)
  }

  render() {
    const {
      isDropdown,
      inputValue,
    } = this.state

    const {
      date,
      time,
      requestStatus,
      force,
      defaultHelp,
      disabled,
    } = this.props
    
    const cls = classNames('saas-ftselect', {
      ['dropup'] : !isDropdown
    })
    return (
      <div className={ cls } ref={ this.selectRef }>
        <Input
          size="large"
          disabled={ disabled }
          onFocus={ this.handleFocusInput }
          placeholder="请选择上门拍摄时间"
          value={ inputValue }
        />
        <Panel
          date={ date }
          time={ time }
          defaultHelp={ defaultHelp }
          requestStatus={ requestStatus }
          force={ force }
          inputVisible={ true }
          onCancel={ this.dropUp }
          onChange={ this.handleChange }
        />
      </div>
    );
  }
}