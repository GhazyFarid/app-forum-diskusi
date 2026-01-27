import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  name,
  minLength = 6,
}) {
  const [show, setShow] = useState(false);
  const id = `password-${name}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 14, fontWeight: 500 }}>
        {label}
      </label>

      <div style={{ position: 'relative' }}>
        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          minLength={minLength}
          className="input-password"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="iconButton"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      </div>
    </div>
  );
}
