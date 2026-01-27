/**
 * skenario pengujian untuk authThunk (fungsi login)
 *
 * - fungsi login (thunk)
 * - harus memicu action fulfilled dengan payload benar saat login sukses
 * - harus memicu action rejected saat proses login gagal
 *
 */

import axios from 'axios';
import { login } from './authReducer';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('authThunk login', () => {
  it('harus memicu action fulfilled dengan payload benar saat login sukses', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        status: 'success',
        message: 'ok',
        data: { token: 'abc' },
      },
    });

    axios.get.mockResolvedValueOnce({
      data: {
        status: 'success',
        message: 'ok',
        data: { user: { name: 'Golden' } },
      },
    });

    const dispatch = jest.fn();
    const thunk = login({ email: 'a@a.com', password: '123' });

    const result = await thunk(dispatch, () => ({}), null);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: login.pending.type }),
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: login.fulfilled.type }),
    );

    expect(result.payload).toEqual({
      token: 'abc',
      user: { name: 'Golden' },
    });
  });

  it('harus memicu action rejected saat proses login gagal', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credential' } },
    });

    const dispatch = jest.fn();
    const thunk = login({});

    const result = await thunk(dispatch, () => ({}), null);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: login.rejected.type }),
    );

    expect(result.payload).toBe('Invalid credential');
  });
});
