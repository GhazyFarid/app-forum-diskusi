/**
 * skenario pengujian untuk usersThunk (fungsi fetchAllUsers)
 *
 * - fungsi fetchAllUsers (thunk)
 * - harus memicu action fulfilled saat berhasil mengambil data user
 * - harus memicu action rejected saat gagal mengambil data user
 *
 */

import axios from 'axios';
import { fetchAllUsers } from './userReducer';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe('usersThunk fetchAllUsers', () => {
  const mockResponse = {
    status: 'success',
    message: 'ok',
    data: {
      users: [
        {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        {
          id: 'jane_doe',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      ],
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('harus memicu action fulfilled saat berhasil mengambil data user', async () => {
    axios.get.mockResolvedValueOnce({ data: mockResponse });

    const dispatch = jest.fn();
    const thunk = fetchAllUsers();

    await thunk(dispatch, () => ({}), null);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchAllUsers.pending.type }),
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchAllUsers.fulfilled.type,
        payload: mockResponse,
      }),
    );
  });

  it('harus memicu action rejected saat gagal mengambil data user', async () => {
    const errorMessage = 'Failed to fetch users';
    axios.get.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    const dispatch = jest.fn();
    const thunk = fetchAllUsers();

    await thunk(dispatch, () => ({}), null);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchAllUsers.pending.type }),
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchAllUsers.rejected.type,
        payload: errorMessage,
      }),
    );
  });
});
