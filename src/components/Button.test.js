/**
 * skenario pengujian untuk komponen Button
 *
 * - komponen Button
 * - harus menampilkan tombol dengan teks (children) yang benar
 * - harus memanggil fungsi onClick saat tombol diklik
 * - tidak boleh memanggil onClick saat tombol dinonaktifkan (disabled)
 * - harus memiliki atribut type default berupa "button"
 * - harus set type "submit" saat properti type diatur ke submit
 * - harus terapkan gaya visual dinonaktifkan (warna & kursor) saat disabled
 * - harus menerapkan gaya khusus yang diberikan melalui properti style
 * - harus ubah warna latar saat hover/unhover jika tidak disabled
 *
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('komponen Button', () => {
  it('harus menampilkan tombol dengan teks (children) yang benar', () => {
    render(<Button>Login</Button>);
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('harus memanggil fungsi onClick saat tombol diklik', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByRole('button', { name: /Click/i }));
    expect(onClick).toHaveBeenCalled();
  });

  it('tidak boleh memanggil onClick saat tombol dinonaktifkan', async () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Click
      </Button>,
    );

    await userEvent.click(screen.getByRole('button', { name: /Click/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('harus memiliki atribut type default berupa "button"', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('harus set type "submit" saat properti type diatur ke submit', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button', { name: /Submit/i })).toHaveAttribute('type', 'submit');
  });

  it('harus terapkan gaya visual dinonaktifkan saat properti disabled aktif', () => {
    render(<Button disabled>Submit</Button>);
    expect(screen.getByRole('button', { name: /Submit/i })).toHaveStyle({
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed',
    });
  });

  it('harus menerapkan gaya khusus yang diberikan melalui properti style', () => {
    render(<Button style={{ padding: 20 }}>Submit</Button>);
    expect(screen.getByRole('button', { name: /Submit/i })).toHaveStyle({
      padding: '20px',
    });
  });

  it('harus ubah warna latar saat hover/unhover jika tidak disabled', async () => {
    render(<Button>Hover</Button>);
    const btn = screen.getByRole('button', { name: /Hover/i });

    await userEvent.hover(btn);
    expect(btn).toHaveStyle({ backgroundColor: '#1d4ed8' });

    await userEvent.unhover(btn);
    expect(btn).toHaveStyle({ backgroundColor: '#2563eb' });
  });
});
