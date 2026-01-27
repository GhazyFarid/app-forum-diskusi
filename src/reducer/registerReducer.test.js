/**
 * skenario pengujian untuk registerReducer
 *
 * - fungsi registerReducer
 * - harus menangani registerUser.pending (status menjadi loading)
 * - harus menangani registerUser.fulfilled (menyimpan data user baru)
 * - harus menangani registerUser.rejected (status jadi error & simpan pesan)
 * - harus menangani clearDataRegister (mengembalikan state ke awal)
 *
 */

import registerReducer, { registerUser, clearDataRegister } from './registerReducer';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('registerReducer', () => {
  const initialState = {
    data: null,
    message: null,
    status: 'idle',
  };

  it('harus menangani registerUser.pending', () => {
    const state = registerReducer(initialState, registerUser.pending());

    expect(state.status).toBe('loading');
    expect(state.message).toBeNull();
  });

  it('harus menangani registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
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
      },
    };

    const state = registerReducer(initialState, action);

    expect(state.status).toBe('success');
    expect(state.data.id).toBe('user-123');
    expect(state.data.name).toBe('John Doe');
    expect(state.message).toBe('User created');
  });

  it('harus menangani registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Register failed',
    };

    const state = registerReducer(initialState, action);

    expect(state.status).toBe('error');
    expect(state.data).toBeNull();
    expect(state.message).toBe('Register failed');
  });

  it('harus menangani clearDataRegister', () => {
    const filledState = {
      data: { id: '123', name: 'Golden' },
      message: 'Success',
      status: 'success',
    };

    const state = registerReducer(filledState, clearDataRegister());

    expect(state.status).toBe('idle');
    expect(state.data).toBeNull();
    expect(state.message).toBeNull();
  });
});
