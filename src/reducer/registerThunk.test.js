/**
 * skenario pengujian untuk registerThunk (fungsi registerUser)
 *
 * - fungsi registerUser (thunk)
 * - harus memicu action fulfilled saat pendaftaran berhasil
 * - harus memicu action rejected dan pesan error saat pendaftaran gagal
 *
 */

import axios from 'axios';
import { registerUser } from './registerReducer';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe('registerThunk registerUser', () => {
  const mockPayload = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  };

  const mockResponse = {
    status: 'success',
    message: 'User created',
    data: {
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('harus memicu action fulfilled saat pendaftaran berhasil', async () => {
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    const dispatch = jest.fn();
    const thunk = registerUser(mockPayload);

    await thunk(dispatch, () => ({}), null);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: registerUser.pending.type }),
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: registerUser.fulfilled.type,
        payload: mockResponse,
      }),
    );
  });

  it('harus memicu action rejected dan pesan error saat pendaftaran gagal', async () => {
    const errorMessage = 'Password too short';
    axios.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    const dispatch = jest.fn();
    const thunk = registerUser({ ...mockPayload, password: '123' });

    await thunk(dispatch, () => ({}), null);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: registerUser.pending.type }),
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: registerUser.rejected.type,
        payload: errorMessage,
      }),
    );
  });
});
