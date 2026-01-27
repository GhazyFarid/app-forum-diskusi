/**
 * skenario pengujian untuk authReducer
 *
 * - authReducer function
 * - harus menangani login.pending (status jadi loading & pesan error bersih)
 * - harus menangani login.fulfilled (simpan token dan data profil user)
 * - harus menangani login.rejected (status jadi error & simpan pesan gagal)
 * - harus menangani logout (hapus token dan data profil dari state)
 *
 */

import authReducer, { logout, login } from './authReducer';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('authReducer', () => {
  const initialState = {
    login: {
      token: null,
      status: 'idle',
      message: null,
    },
    profile: {
      data: null,
      status: 'idle',
      message: null,
    },
  };

  it('harus menangani login.pending', () => {
    const state = authReducer(initialState, login.pending());
    expect(state.login.status).toBe('loading');
    expect(state.login.message).toBeNull();
  });

  it('harus menangani login.fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: {
        token: 'token-123',
        user: { id: 'user-1', name: 'Golden' },
      },
    };

    const state = authReducer(initialState, action);

    expect(state.login.status).toBe('success');
    expect(state.login.token).toBe('token-123');
    expect(state.profile.data.name).toBe('Golden');
  });

  it('harus menangani login.rejected', () => {
    const action = {
      type: login.rejected.type,
      payload: 'Login failed',
    };

    const state = authReducer(initialState, action);

    expect(state.login.status).toBe('error');
    expect(state.login.token).toBeNull();
    expect(state.login.message).toBe('Login failed');
  });

  it('harus menangani logout', () => {
    const loggedState = {
      login: { token: 'abc', status: 'success', message: null },
      profile: { data: { name: 'Golden' }, status: 'success', message: null },
    };

    const state = authReducer(loggedState, logout());

    expect(state.login.token).toBeNull();
    expect(state.profile.data).toBeNull();
  });
});
