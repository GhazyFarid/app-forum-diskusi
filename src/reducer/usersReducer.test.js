/**
 * skenario pengujian untuk usersReducer
 *
 * - fungsi usersReducer
 * - harus menangani fetchAllUsers.pending (status menjadi loading)
 * - harus menangani fetchAllUsers.fulfilled (menyimpan daftar data user)
 * - harus menangani fetchAllUsers.rejected (status error & simpan pesan)
 * - harus menangani clearUsersState (mengembalikan state ke kondisi awal)
 *
 */

import usersReducer, { fetchAllUsers, clearUsersState } from './userReducer';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe('usersReducer', () => {
  const initialState = {
    data: [],
    status: 'idle',
    message: null,
  };

  it('harus menangani fetchAllUsers.pending', () => {
    const state = usersReducer(initialState, fetchAllUsers.pending());

    expect(state.status).toBe('loading');
    expect(state.message).toBeNull();
  });

  it('harus menangani fetchAllUsers.fulfilled', () => {
    const action = {
      type: fetchAllUsers.fulfilled.type,
      payload: {
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
      },
    };

    const state = usersReducer(initialState, action);

    expect(state.status).toBe('success');
    expect(state.data.length).toBe(2);
    expect(state.data[0].id).toBe('john_doe');
    expect(state.message).toBe('ok');
  });

  it('harus menangani fetchAllUsers.rejected', () => {
    const action = {
      type: fetchAllUsers.rejected.type,
      payload: 'Failed to fetch users',
    };

    const state = usersReducer(initialState, action);

    expect(state.status).toBe('error');
    expect(state.data).toEqual([]);
    expect(state.message).toBe('Failed to fetch users');
  });

  it('harus menangani clearUsersState', () => {
    const filledState = {
      data: [
        { id: '1', name: 'Golden' },
      ],
      status: 'success',
      message: 'ok',
    };

    const state = usersReducer(filledState, clearUsersState());

    expect(state.status).toBe('idle');
    expect(state.data).toEqual([]);
    expect(state.message).toBeNull();
  });
});
