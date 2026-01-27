import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

import { login } from '../reducer/authReducer';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, message, token } = useSelector((s) => s.auth.login);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  // Redirect setelah login sukses
  useEffect(() => {
    if (status === 'success' && token) {
      navigate('/');
    }
  }, [status, token, navigate]);

  return (
    <div className="container">
      <div className="card">
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            fontWeight: 500,
            color: '#2563eb',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <BiArrowBack size={18} />
          Kembali 
        </button>
        <h2>Welcome Back</h2>

        <form onSubmit={onSubmit}>
          <TextInput
            label="Email"
            type="email"
            placeholder="Input Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <PasswordInput
            label="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Input Password"
          />

          <Button disabled={status === 'loading'} type="submit">
            {status === 'loading' ? 'Loading...' : 'Login'}
          </Button>

          {status === 'error' && (
            <p data-cy="login-error" style={{ color: '#ef4444', marginTop: 8 }}>
              {message}
            </p>
          )}
        </form>

        <p
          style={{
            marginTop: 16,
            fontSize: 14,
            color: '#6b7280',
            textAlign: 'center',
          }}
        >
          Belum punya akun?
          <Link
            to="/register"
            style={{
              color: '#2563eb',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
