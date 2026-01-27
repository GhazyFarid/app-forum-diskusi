import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

import { clearDataRegister, registerReducer } from '../reducer/registerReducer';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.register);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerReducer(form));
  };

  useEffect(() => {
    if (status === 'success') {
      dispatch(clearDataRegister());
      navigate('/login');
    }
  }, [status, navigate, dispatch]);

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

        <h2>Register Page</h2>

        <form onSubmit={onSubmit}>
          <TextInput
            label="Name"
            type="text"
            placeholder="Input Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <TextInput
            label="Email"
            type="email"
            placeholder="Input Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <PasswordInput
            label="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Input Password"
            required
          />

          <Button disabled={status === 'loading'} type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
