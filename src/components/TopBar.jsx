import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiLogIn, FiLogOut } from "react-icons/fi";

import { logout } from "../reducer/authReducer";

export default function TopBar() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => Boolean(state.auth.login.token));

  return (
    <header
      style={{
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Menu */}
        <nav style={{ display: "flex", gap: 16 }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              fontWeight: 600,
              color: isActive ? "#2563eb" : "#374151",
              textDecoration: "none",
            })}
          >
            Threads
          </NavLink>

          <NavLink
            to="/leaderboard"
            style={({ isActive }) => ({
              fontWeight: 600,
              color: isActive ? "#2563eb" : "#374151",
              textDecoration: "none",
            })}
          >
            Leaderboard
          </NavLink>
        </nav>

        {/* Right Menu */}
        <div>
          {isAuthenticated ? (
            <button
              onClick={() => dispatch(logout())}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#ef4444",
              }}
            >
              <FiLogOut size={16} />
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                color: "#2563eb",
              }}
            >
              <FiLogIn size={16} />
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
