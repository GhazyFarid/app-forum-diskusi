import React, { useState } from 'react';
import TextInput from '../components/TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    label: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    name: { control: 'text' },
  },
};

const Template = (args) => {
  const { value: initialValue } = args;
  const [value, setValue] = useState(initialValue || '');

  return (
    <TextInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Nama',
  placeholder: 'Masukkan nama',
  required: false,
  name: 'nama',
  type: 'text',
  value: '',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Email',
  placeholder: 'Masukkan email',
  required: true,
  name: 'email',
  type: 'email',
  value: '',
};
