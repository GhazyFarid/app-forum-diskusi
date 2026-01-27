import React, { useState } from 'react';
import PasswordInput from '../components/PasswordInput';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    name: { control: 'text' },
    minLength: { control: 'number' },
  },
};

const Template = (args) => {
  const { value: initialValue } = args;
  const [value, setValue] = useState(initialValue || '');

  return (
    <PasswordInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Password',
  placeholder: 'Masukkan password',
  required: false,
  name: 'password',
  minLength: 6,
  value: '',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Password',
  placeholder: 'Masukkan password minimal 6 karakter',
  required: true,
  name: 'password',
  minLength: 6,
  value: '',
};
