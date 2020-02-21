import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import AddressSelect from '../src/components/AddressSelect'
import '../mock/address-select.mock'

export default {
  title: 'Address Select',
  decorators: [storyFn => <div style={{ minHeight: 400 }}>{ storyFn() }</div>]
};

export const Default = () => {
  const [ address, setAddress ] = useState({})

  const cityList = [
    {
      city_id: 110000,
      city_name: '北京市'
    },
    {
      city_id: 310000,
      city_name: '上海市'
    }
  ]

  function handleChange(newOne) {
    action('onChange')(newOne)
    console.log(newOne)
    setAddress(newOne)
  }

  async function fecthDistrict({ city_id }) {
    return fetch('http://mock.com/district', {
      method: 'GET',
      body: { city_id }
    }).then(function(response) {
      return response.json()
    });
  }

  async function fecthBizcircle({ city_id, district_id }) {
    return fetch('http://mock.com/bizcircle', {
      method: 'GET',
      body: { city_id, district_id }
    }).then(function(response) {
      return response.json()
    });
  }

  return (
    <AddressSelect 
      cityList={ cityList }
      value={ address }
      onChange={ handleChange }
      requestDistrict={ fecthDistrict }
      requestBizcircle={ fecthBizcircle }
    />
  )
}



