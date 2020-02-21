import * as React from 'react'
import { message, Input, Icon, Button } from 'antd'
import TextButton from '../../TextButton'
import Spin from '../../Spin'
import classNames from 'classnames'
import * as moment from 'moment'
import { TDateStatus, TAvailable, ETime } from '../type'

import './index.styl'

type ETab = 'date' | 'time'

interface IPanelProps {
  date: string
  time: ETime
  requestStatus: (date: string, time?: ETime) => Promise<TDateStatus>
  onChange: (date: string, time: ETime, stringValue: string) => void
  onCancel: () => void
  force: boolean
  inputVisible: boolean
  defaultHelp?: string
}

interface IPanelState {
  innerDate: moment.Moment
  innerTime: ETime
  activeTab: ETab
  dateOptions: moment.Moment[]
  timeOptions: TDateStatus
  loading: boolean
  help: string
}

function time2string(time?: ETime): string {
  if(time === 1) return '上午'
  if(time === 2) return '下午'
  return '未知'
}

export function datetime2string(date: moment.Moment, time?: ETime): string {
  const valueList: string[] = []
  if (moment.isMoment(date)) {
    const now = moment()
    valueList.push(date.format('MMMDo'))
    const calenders = [' 今天', ' 明天', ' 后天']
    const diff = date.startOf('day').diff(now.startOf('day'), 'days')
    const suffix = calenders[diff]

    suffix && valueList.push(suffix)

    if (time != undefined) {
      valueList.push(time === 1 ? '上午' : '下午')
    }
  }
  return valueList.join(' ')
}

function generateDateList (days: number): moment.Moment[] {
  const list = []

  let count = 1
  while (count <= days) {
    list.push(moment().add(count++, 'days'))
  }

  return list
}

export default class Panel extends React.PureComponent<IPanelProps, IPanelState> {
  state: IPanelState = {
    innerDate: undefined,
    innerTime: undefined,
    activeTab: 'date',
    timeOptions: undefined,
    dateOptions: generateDateList(7),
    loading: false,
    help: ''
  }

  UNSAFE_componentWillReceiveProps(nextProps: IPanelProps) {
    const { date, time } = this.props
    if(date !== nextProps.date || time !== nextProps.time) {
      this.reset(nextProps)
    }
  }

  reset = (newProps: IPanelProps = this.props) => {
    const { date, time } = newProps
    this.setState({
      innerDate: moment(date),
      innerTime: time,
      timeOptions: undefined,
      dateOptions: generateDateList(7),
      loading: false,
      help: ''
    })
    this.bindClickTab('date')()
  }

  bindClickTab = (activeTab: ETab) => async () => {
    const { activeTab: currentActiveTab } = this.state

    if(activeTab === currentActiveTab) return

    if(activeTab === 'date') {
      this.setState({ activeTab })
      return
    }

    if(activeTab === 'time') {
      const { innerDate, innerTime } = this.state
      if(innerDate == undefined) return

      this.setState({
        activeTab,
        timeOptions: undefined,
        loading: true
      })
      
      try {
        const timeOptions = await this.props.requestStatus(innerDate.format('YYYYMMDD'), innerTime)
        // check
        const { 
          forenoon_available,
          afternoon_available,
          work_time,
          lunch_break
        } = timeOptions || {}

        if (
          typeof forenoon_available === 'number' &&
          typeof afternoon_available === 'number' &&
          Array.isArray(work_time)
        ) {
          this.setState({ 
            timeOptions,
            loading: false 
          })
        } else {
          throw new Error('数据格式错误')
        }
      } catch (error) {
        message.error('获取城区选项失败: ' + (error && error.message || '未知错误'))
        this.setState({
          timeOptions: undefined,
          loading: false,
        })
      }
    }
  }

  bindChangeDate = (date: moment.Moment) => () => {
    this.setState({
      innerDate: date,
      innerTime: undefined
    }, this.bindClickTab('time'))
  }

  bindChangeTime = (time: ETime, available: TAvailable) => () => {
    const { force } = this.props

    // 强制分配，予以提示
    const help = force && available === 0 ? '强制分配，予以提示' : undefined

    this.setState({ 
      help,
      innerTime: time
    })
  }

  handleReset = () => this.reset()

  handleCancel = this.props.onCancel

  handleConfirm = () => { 
    const { innerDate, innerTime } = this.state
    if(innerDate != undefined || innerTime != undefined) {
      this.props.onChange(innerDate.format('YYYYMMDD'), innerTime, datetime2string(innerDate, innerTime))
    } else {
      message.error('请选择有效时间')
    }
  }

  renderHead = () => {
    const { inputVisible, date, time } = this.props
    const { innerTime, innerDate } = this.state

    if(!inputVisible) return null

    const placeholder = 
      date == undefined 
      ? '请选择上门拍摄时间' 
      : datetime2string(moment(date), time)

    return (
      <div className="head">
        <Input
          size="large"
          placeholder={ placeholder }
          value = { datetime2string(innerDate, innerTime) }
          // onChange={ this.handleInputChange }
        />
      </div>
    )
  }

  renderTab = () => {
    const { innerTime, innerDate, activeTab } = this.state

    return (
      <div className="tab">
        <TextButton
          active={ activeTab === 'date' }
          onClick={ this.bindClickTab('date') }
        >
          { innerDate == undefined ? '日期' : innerDate.format('MMMDo') }
        </TextButton>
        -
        <TextButton
          active={ activeTab === 'time' }
          onClick={ this.bindClickTab('time') }
        >
          { innerTime == undefined ? '时间': time2string(innerTime) }
        </TextButton>
      </div>
    )
  }

  renderPane = () => {
    const { innerDate, innerTime, loading, activeTab, dateOptions, timeOptions, help } = this.state
    const { force, defaultHelp } = this.props

    const lunch_break = [ '12:00', '12:00' ]
    
    const cls = classNames('pane', activeTab)
    const helpString = help || defaultHelp

    return (
      <div className={ cls }>
        <Spin spinning={ loading }>
          <div className="pane-item date">
            { dateOptions.map((item, i) => (
              <TextButton
                key={ i }
                active={ item.isSame(innerDate, 'day') }
                sub={ item.format('dddd') }
                onClick={ this.bindChangeDate(item) }
              >
                { item.format('MMMDo') }
              </TextButton>
            )) }
          </div>
          <div className="pane-item time">
            {
              timeOptions != undefined ? (
                <React.Fragment>
                  <TextButton
                    active={ innerTime === 1 }
                    disabled={ timeOptions.forenoon_available === 0 && !force }
                    onClick={ this.bindChangeTime(1, timeOptions.forenoon_available) }
                  >
                    { `上午（${timeOptions.work_time[0]}-${lunch_break[0]}）${ timeOptions.forenoon_available === 1 ? '空闲' : '已满' }` }
                  </TextButton>

                  <TextButton
                    active={ innerTime === 2 }
                    disabled={ timeOptions.afternoon_available === 0 && !force }
                    onClick={ this.bindChangeTime(2, timeOptions.afternoon_available) }
                  >
                    { `下午（${lunch_break[1]}-${timeOptions.work_time[1]}）${ timeOptions.afternoon_available === 1 ? '空闲' : '已满' }` }
                  </TextButton>
                </React.Fragment>
              ) : null
            }
          </div>
        </Spin>
        { helpString ? <div className="pane-help">{ helpString }</div> : null }
      </div>
    )
  }

  renderFoot = () => {
    const { innerDate, innerTime } = this.state

    return (
      <div className="foot">
        <div className="foot-prefix">
          <TextButton onClick={ this.handleReset }>重置选项<Icon type="reload" /></TextButton>
        </div>
        <div className="foot-action">
          <Button onClick={ this.handleCancel }>取消</Button>
          <Button 
            onClick={ this.handleConfirm } 
            disabled={ innerDate == undefined || innerTime == undefined } 
            type="primary"
          >
            确定
          </Button>
        </div>
      </div>  
    )
  }

  render() {
    return (
      <div className="saas-ftselect-panel">
        { this.renderHead() }
        { this.renderTab() }
        { this.renderPane() }
        { this.renderFoot() }
      </div>
    )
  }
}
