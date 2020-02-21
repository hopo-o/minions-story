import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Checkbox from '../src/components/Checkbox'

export default {
  title: 'Checkbox',
}

export const Default = () => {
  const [ selected, setSeleted ] = useState([])

  const statusOptions = [
    {
      "value":1,
      "comment":"派单中"
    },
    {
      "value":2,
      "comment":"已接单"
    },
    {
      "value":7,
      "comment":"拍摄失败"
    },
    {
      "value":4,
      "comment":"拍摄结束"
    },
    {
      "value":6,
      "comment":"转单中"
    },
    {
      "value":5,
      "comment":"订单完成"
    },
    {
      "value":101,
      "comment":"已取消"
    }
  ]

  function handleChange(newOne) {
    action('onChange')(newOne)
    setSeleted(newOne)
  }

  return (
    <Checkbox 
      selected={ selected }
      options={ statusOptions }
      onChange={ handleChange }
    />
  )
}