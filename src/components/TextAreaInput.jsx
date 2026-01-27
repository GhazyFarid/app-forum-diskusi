export default function TextAreaInput({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 4,
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {label}
      <textarea
        placeholder={placeholder}
        value={value}
        required={required}
        rows={rows}
        onChange={onChange}
        style={{
          marginTop: 6,
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
          fontSize: 14,
          outline: "none",
          resize: "vertical",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#667eea";
          e.target.style.boxShadow = "0 0 0 2px rgba(102,126,234,0.2)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#ddd";
          e.target.style.boxShadow = "none";
        }}
      />
    </label>
  );
}
