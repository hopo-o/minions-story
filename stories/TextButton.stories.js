import React from 'react';
import { action } from '@storybook/addon-actions';
import TextButton from '../src/components/TextButton'

export default {
  title: 'Text Button',
};

export const Default = () => <TextButton onClick={ action('TextButton: click') }>Default</TextButton>

export const Active = () => (
  <TextButton
    active={ true }
    onClick={ action('TextButton: click')}
  >
    Active
  </TextButton>
)

export const Disabled = () => (
  <TextButton
    disabled={ true }
    onClick={ action('TextButton: click')}
  >
    Active
  </TextButton>
)

export const Sub = () => (
  <TextButton
    sub="sub"
    onClick={ action('TextButton: click')}
  >
    Main
  </TextButton>
)