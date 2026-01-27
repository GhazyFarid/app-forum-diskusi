export default function TextAreaInput({
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  rows = 4,
  name,
}) {
  const id = `textarea-${name}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 14, fontWeight: 500 }}>
        {label}
      </label>

      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        rows={rows}
        onChange={onChange}
        className="textarea"
      />
    </div>
  );
}
