import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  name,
  minLength = 6,
}) {
  const [show, setShow] = useState(false);

  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: 14,
        fontWeight: 500,
        position: "relative",
      }}
    >
      {label}

      <div style={{ position: "relative" }}>
        <input
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          minLength={minLength}
          style={{
            marginTop: 6,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 14,
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
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

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-30%)",
            border: "none",
            cursor: "pointer",
            padding: 0,
            background: "transparent",
            margin: 0,
          }}
        >
          {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      </div>
    </label>
  );
}
