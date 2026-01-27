import React, { useState } from 'react';
import TextAreaInput from '../components/TextAreaInput';

export default {
  title: 'Components/TextAreaInput',
  component: TextAreaInput,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    rows: { control: 'number' },
    name: { control: 'text' },
  },
};

const Template = (args) => {
  const { value: initialValue } = args;
  const [value, setValue] = useState(initialValue || '');

  return (
    <TextAreaInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Komentar',
  placeholder: 'Tulis komentar kamu...',
  required: false,
  rows: 4,
  name: 'comment',
  value: '',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Deskripsi',
  placeholder: 'Masukkan deskripsi...',
  required: true,
  rows: 6,
  name: 'description',
  value: '',
};
