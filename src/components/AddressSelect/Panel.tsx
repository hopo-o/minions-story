import * as React from 'react';
import classNames from 'classnames'
import { Input, Button, Icon, message } from 'antd'
import Spin from '../Spin'
import TextButton from '../TextButton'
import { CityType, DistrictType, BizcircleType, AddressType } from './type'

type TabType = 'city' | 'district' | 'bizcircle'

interface IProps {
  address         : AddressType
  cityOptions     : Array<CityType>
  onConfirm       : (address: AddressType) => void
  onCancel        : () => void
  requestDistrict : (address: AddressType) => Promise<DistrictType[]>
  requestBizcircle: (address: AddressType) => Promise<BizcircleType[]>
}

interface IState {
  innerAdress     : AddressType
  activeTab       : TabType
  filter          : string
  districtOptions : Array<DistrictType>
  bizcircleOptions: Array<BizcircleType>
  loading         : boolean
}

export function address2string(address: AddressType) {
  const {
    city_id,
    city_name,
    district_id,
    district_name,
    bizcircle_id,
    bizcircle_name,
  } = address
  const strs = []

  city_id && strs.push(city_name) &&
  district_id && strs.push(district_name) &&
  bizcircle_id && strs.push(bizcircle_name)

  return strs.join(' / ')
}


export default class AddressPanel extends React.PureComponent<IProps, IState> {
  state: IState = {
    innerAdress     : {},
    activeTab       : 'city',
    filter          : undefined,
    loading         : false,
    districtOptions : [],
    bizcircleOptions: [],
  }

  UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    // TODO: 这里可能会因为其他props的改变而强行赋值
    const { address } = this.props
    this.setState({ innerAdress: { ...address } })
    this.bindClickTab('city')()
  }

  componentDidMount() {
    const { address, cityOptions } = this.props
    if(!address.city_id && cityOptions.length > 0) {
      const city = cityOptions[0]
      const newAddress: AddressType = {
        ...city,
        district_id: undefined,
        district_name: undefined,
        bizcircle_id: undefined,
        bizcircle_name: undefined,
      }
      this.props.onConfirm(newAddress)
    }
  }

  handleFocusInput = () => {
    const { activeTab } = this.state
    if(activeTab === 'city') {
      this.setState({ filter: '' })
    }
  }
  
  handleBlurInput = () => {
    this.setState({ filter: undefined })
  }

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeTab, filter } = this.state
    const newValue = event.target.value
    if(activeTab === 'city' && filter !== undefined) {
      this.setState({ filter: newValue })
    }
  }

  handleReset = () => {
    const { cityOptions } = this.props
    const city = cityOptions[0]
    const newAddress: AddressType = {
      ...city,
      district_id: undefined,
      district_name: undefined,
      bizcircle_id: undefined,
      bizcircle_name: undefined,
    }
    this.setState({ innerAdress: newAddress })
    this.bindClickTab('city')()
  }

  handleCancel = () => {
    const { address } = this.props
    this.props.onCancel()
  }

  handleConfirm = () => {
    const { innerAdress } = this.state
    this.props.onConfirm({...innerAdress})
  }

  bindClickTab = (activeTab: TabType) => async () => {
    const { innerAdress } = this.state
    const { activeTab: currentActiveTab } = this.state
    if(activeTab === currentActiveTab) return

    if(activeTab === 'city') {
      this.setState({ activeTab })
    }

    if(activeTab === 'district') {
      const { city_id } = innerAdress
      if(!city_id) return
      
      this.setState({
        activeTab,
        loading: true,
        districtOptions: [],
      })

      try {
        const districtOptions = await this.props.requestDistrict(innerAdress)
        if(!Array.isArray(districtOptions)) throw new Error('数据格式错误')
        this.setState({
          districtOptions,
          loading: false
        })
      } catch (error) {
        message.error('获取城区选项失败: ' + (error && error.message || '未知错误'))
        this.setState({
          districtOptions: [],
          loading: false,
        })
      }
    }

    if(activeTab === 'bizcircle') {
      const { city_id, district_id } = innerAdress
      if(!city_id || !district_id) return

      this.setState({
        activeTab,
        loading: true,
        bizcircleOptions: [],
      })

      try {
        const bizcircleOptions = await this.props.requestBizcircle(innerAdress)
        if(!Array.isArray(bizcircleOptions)) throw new Error('数据格式错误')
        this.setState({ 
          bizcircleOptions,
          loading: false 
        })
      } catch (error) {
        message.error('获取商圈选项失败: ' + (error && error.message || '未知错误'))
        this.setState({ 
          bizcircleOptions: [],
          loading: false
        })
      }
    }
  }

  bindChangeCity = (city: CityType) => () => {
    const { innerAdress } = this.state
    const newAddress: AddressType = {
      ...city,
      district_id: undefined,
      district_name: undefined,
      bizcircle_id: undefined,
      bizcircle_name: undefined,
    }
    this.setState({ innerAdress: newAddress }, this.bindClickTab('district'))
  }

  bindChangeDistrict = (district: DistrictType) => () => {
    const { innerAdress } = this.state
    const newAddress: AddressType = {
      ...innerAdress,
      ...district,
      bizcircle_id: undefined,
      bizcircle_name: undefined,
    }
    this.setState({ innerAdress: newAddress }, this.bindClickTab('bizcircle'))
  }

  bindChangeBizcircle = (bizcircle: BizcircleType) => () => {
    const { innerAdress } = this.state
    const newAddress: AddressType = {
      ...innerAdress,
      ...bizcircle
    }

    this.setState({ innerAdress: newAddress })
  }

  

  renderHead = () => {
    const { filter, innerAdress } = this.state

    const addressString = address2string(innerAdress)
    return (
      <div className="head">
        <Input 
          value={ filter === undefined ? addressString :  filter}
          placeholder={ addressString }
          onFocus={ this.handleFocusInput }
          onBlur={ this.handleBlurInput }
          onChange={ this.handleChangeInput }
        />
      </div>
    )
  }

  renderTab = () => {
    const { activeTab, innerAdress } = this.state
    return (
      <div className="tab">
        <TextButton
          active={ activeTab === 'city' }
          onClick={ this.bindClickTab('city') }
        >
          { innerAdress.city_name || '城市' }
        </TextButton>
        -
        <TextButton
          active={ activeTab === 'district' }
          onClick={ this.bindClickTab('district') }
        >
          { innerAdress.district_name || '城区' }
        </TextButton>
        -
        <TextButton
          active={ activeTab === 'bizcircle' }
          onClick={ this.bindClickTab('bizcircle') }
        >
          { innerAdress.bizcircle_name || '商圈' }
        </TextButton>
      </div>
    )
  }

  renderPane = () => {
    const { activeTab, districtOptions, bizcircleOptions, innerAdress, filter, loading } = this.state
    const { cityOptions } = this.props

    const cls = classNames('pane', activeTab)

    const filterCallback = (city: CityType) => 
      !filter || 
      city.city_name.indexOf(filter) >= 0 ||
      String(city.city_id).indexOf(filter) >= 0

    return (
      <div className={ cls }>
        <Spin spinning={ loading }>
        <div className="pane-item city">
          { cityOptions.filter(filterCallback).map(item => 
            <TextButton
              key={ `city-${item.city_id}` }
              active={ item.city_id === innerAdress.city_id }
              onMouseDown={ this.bindChangeCity(item) } 
            >
              { item.city_name || '未知' }
            </TextButton>
          ) }
        </div>
        <div className="pane-item district">
          { districtOptions.map(item => 
            <TextButton 
              key={ `district-${item.district_id}`}
              active={ item.district_id === innerAdress.district_id }
              onClick={ this.bindChangeDistrict(item) }
            >
              { item.district_name || '未知' }
            </TextButton>
          ) }
        </div>
        <div className="pane-item bizcircle">
          { bizcircleOptions.map(item => 
            <TextButton 
              key={ `district-${item.bizcircle_id}`}
              active={ item.bizcircle_id === innerAdress.bizcircle_id }
              onClick={ this.bindChangeBizcircle(item) }
            >
              { item.bizcircle_name || '未知' }
            </TextButton>
          ) }
        </div>
        </Spin>
      </div>
    )
  }

  renderFoot = () => (
    <div className="foot">
      <div className="foot-prefix">
        <TextButton onClick={ this.handleReset }>重置选项<Icon type="reload" /></TextButton>
      </div>
      <div className="foot-action">
        <Button onClick={ this.handleCancel }>取消</Button>
        <Button onClick={ this.handleConfirm } type="primary">确定</Button>

      </div>
    </div>
  )

  render() {
    return (
      <div className="saas-adselect-panel">
        { this.renderHead() }
        { this.renderTab() }
        { this.renderPane() }
        { this.renderFoot() }
      </div>
    );
  }
}
