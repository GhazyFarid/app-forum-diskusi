/**
 * skenario pengujian untuk komponen TextInput
 *
 * - komponen TextInput
 * - harus menampilkan label sesuai dengan properti label yang diberikan
 * - harus menampilkan input dengan atribut yang benar (type, name, placeholder, required)
 * - harus memiliki ID input yang mengikuti pola `input-{name}`
 * - harus memanggil fungsi onChange saat pengguna memasukkan teks
 *
 */

import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('komponen TextInput', () => {
  const label = 'Email';
  const value = '';
  const onChange = jest.fn();
  const type = 'email';
  const placeholder = 'Input Email';
  const required = true;
  const name = 'email';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('harus menampilkan label sesuai dengan properti label yang diberikan', () => {
    render(
      <TextInput
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />,
    );

    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });

  it('harus menampilkan input dengan atribut yang benar dan ID yang sesuai', () => {
    render(
      <TextInput
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />,
    );

    const input = screen.getByPlaceholderText('Input Email');

    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('id', 'input-email');
  });

  it('harus memanggil fungsi onChange saat pengguna memasukkan teks', () => {
    render(
      <TextInput
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />,
    );

    const input = screen.getByPlaceholderText('Input Email');

    fireEvent.change(input, { target: { value: 'test@mail.com' } });

    expect(onChange).toHaveBeenCalled();
  });
});
