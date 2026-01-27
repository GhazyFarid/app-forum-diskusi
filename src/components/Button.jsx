export default function Button({
  children,
  onClick,
  disabled = false,
  style = {},
  type = "button",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        border: "none",
        backgroundColor: disabled ? "#9ca3af" : "#2563eb",
        color: "#fff",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.2s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.target.style.backgroundColor = "#1d4ed8";
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.target.style.backgroundColor = "#2563eb";
      }}
    >
      {children}
    </button>
  );
}
