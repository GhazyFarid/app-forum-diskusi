export default function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  name,
}) {
  const inputId = `input-${name}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label
        style={{
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        style={{
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #ddd',
          fontSize: 14,
          outline: 'none',
        }}
      />
    </div>
  );
}
