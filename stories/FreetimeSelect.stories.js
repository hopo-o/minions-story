import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import FreetimeSelect from '../src/components/FreetimeSelect'
import '../mock/datetime-select.mock'
import moment from 'moment'

moment.locale('zh-cn')

export default {
  title: 'Freetime Select',
  decorators: [storyFn => <div style={{ minHeight: 400 }}>{ storyFn() }</div>]
};

export const Default = () => {
  const [ date, setDate ] = useState(undefined)
  const [ time, setTime ] = useState(undefined)


  function handleChange(date, time) {
    const newOne = { date, time }
    action('onChange')(newOne)
    console.log(newOne)
    setDate(date)
    setTime(time)
  }

  async function fecthFreetime(date) {
    return fetch('http://mock.com/freetime', {
      method: 'GET',
      body: { date }
    }).then(function(response) {
      return response.json()
    });
  }


  return (
    <FreetimeSelect
      date={ date }
      time={ time }
      onChange={ handleChange }
      requestStatus={ fecthFreetime }
    />
  )
}