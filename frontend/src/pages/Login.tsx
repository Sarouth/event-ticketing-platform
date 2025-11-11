import { useState } from "react";
import { loginUser } from "../api/auth";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user", // 👈 Default role
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await loginUser(form);
    localStorage.setItem("token", res.data.access);
    localStorage.setItem("role", form.role); // store role locally
    alert(`Login successful as ${form.role}!`);

    // redirect after successful login
    if (form.role === "organizer") {
      window.location.href = "/add-event";
    } else {
      window.location.href = "/profile";
    }
  } catch (err) {
    console.error("Login failed:", err);
    alert("Invalid username, password, or role");
  }
};



  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-title">Login</div>

        <form onSubmit={handleSubmit} className="auth-fields">
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <div className="input-with-toggle">
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label="toggle"
              className="toggle-eye"
            >
              {showPassword ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.08 21.08 0 0 1 5-5.18"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1l22 22"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* 👇 New Role Dropdown */}
          <select
            className="auth-input"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>

          <a className="muted-link" href="#">
            Forgot your password?
          </a>
          <a className="muted-link" href="/register">
            Don’t have an account? Sign up
          </a>

          <button className="btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
