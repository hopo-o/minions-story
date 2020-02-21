import React from 'react';
import Spin, { SpinOption } from '../src/components/Spin'
import { Table } from 'antd';

export default {
  title: 'Spin',
};

export const Default = () => {
  const containerStyle = {
    height: 300,
    width: 500,
    margin: 'auto',
    backgroundColor: '#CCC',
    textAlign: 'center',
    lineHeight: '300px'
  }

  return (
    <div style={ containerStyle } >
      <Spin spinning={ true } />
    </div>
  )
}

export const Option = () => {
  const columns = [
    { title: '序号' },
    { title: '订单编号' },
    { title: '订单名称' },
    { title: '下单人' },
    { title: '摄影师' },
  ]

  return (
    <Table 
      columns={columns} 
      loading={ SpinOption } 
    />
  )
}
