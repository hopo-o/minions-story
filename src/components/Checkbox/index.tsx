import * as React from 'react'
import classNames from 'classnames'

import './index.styl'

type TStatusOption = {
  value: number
  comment: string
}

interface IOptionProps {
  option: TStatusOption
  active: boolean
  onToggle: (active: boolean) => void
}

interface IProps {
  selected: number[]
  options: TStatusOption[]
  onChange: (value: number[]) => void
}


const OptionAll: TStatusOption = {
  value: -1,
  comment: '全部'
}

function CheckboxOption(props: IOptionProps) {
  const {
    option,
    active = false,
    onToggle
  } = props

  const cls = classNames('saas-checkbox-item', { active })

  const handleClick = () => onToggle(!active)

  return (
    <div
      key={ option.value }
      className={ cls }
      onClick={ handleClick }
    >
      { option.comment || '未知' }
    </div>
  )
}

let Checkbox: React.FunctionComponent<IProps>
export default Checkbox = props => {
  const { 
    options = [],
    selected = [],
    onChange,
  } = props

  const handleSelect = (value: number) => (active: boolean) => {
    if(active) {
      // 添加
      onChange([ ...selected, value ])
    } else {
      // 删去
      onChange(selected.filter(item => item !== value))
    }
  }

  return (
    <div className="saas-checkbox">
      {/* 全部选项 */}
      <CheckboxOption 
        option={ OptionAll }
        active={ selected.length <= 0 }
        onToggle={ () => onChange([]) }
      />

      { 
        options.map(option => (
          <CheckboxOption
            key={ option.value }
            option={ option }
            active={ selected.indexOf(option.value) >= 0 }
            onToggle={ handleSelect(option.value) }
          />
        ))
      }
    </div>
  )
}



// class SaasButtonRadio extends React.Component {
//   bindItemClick = (value) => () => {
//     const { list } = this.props
//     if (!Array.isArray(list)) return
//     if (value === valueAll) {
//       // 选中 “全部”
//       this.props.onChange([])
//     } else {
//       if (list.indexOf(value) < 0) {
//         this.props.onChange([...list, value])
//       } else {
//         this.props.onChange(list.filter(item => item !== value))
//       }
//     }
//   }

//   renderOptions = (options) => {
//     if (!Array.isArray(options)) options = []

//     const { list } = this.props
//     return options.map(({ value, comment }, index) => {
//       const classString = classNames({
//         'VR-button-checkbox-item': true,
//         'active': list.indexOf(value) >= 0
//       })

//       return (
//         <div
//           key={ index }
//           onClick={ this.bindItemClick(value) }
//           className={ classString }
//         >
//         { comment }
//         </div>
//       )
//     })
//   }

//   renderALLOption = () => {
//     const { list } = this.props
//     const option = {
//       value: valueAll,
//       comment: '全部'
//     }

//     const classString = classNames({
//       'VR-button-checkbox-item': true,
//       'active': list.length < 1
//     })

//     return (
//       <div
//         key={ option.value }
//         onClick={ this.bindItemClick(option.value) }
//         className={ classString }
//       >
//         { option.comment }
//       </div>
//     )
//   }

//   render () {
//     const { list, options } = this.props

//     return (
//       <div className="VR-button-checkbox">
//         { this.renderALLOption() }
//         { this.renderOptions(options) }
//       </div>
//     )
//   }
// }

// SaasButtonRadio.propTypes = {
//   // 用于设置当前选中的值,[]表示选择全部
//   list: PropTypes.array.isRequired,

//   // 选项
//   options: PropTypes.array,

//   // 选项变化时的回调函数
//   onChange: PropTypes.func
// }

// SaasButtonRadio.defaultValue = {
//   options: [],
//   onChange: (value) => {}
// }
