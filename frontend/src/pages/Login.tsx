import { useState } from "react";
import { loginUser } from "../api/auth";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  // token is stored in localStorage; no component-level tracking required
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.access);
      alert("Login successful!");
    } catch {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-title">Login</div>
            <form onSubmit={handleSubmit} className="auth-fields">
              <input className="auth-input" type="email" name="username" placeholder="Email Address" onChange={handleChange} required />
              <div className="input-with-toggle">
                <input className="auth-input" type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" onChange={handleChange} required />
                  <button type="button" onClick={() => setShowPassword(s => !s)} aria-label="toggle" className="toggle-eye">
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" fill="currentColor"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.08 21.08 0 0 1 5-5.18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
              </div>
              <a className="muted-link" href="#">Forgot your password?</a>
              <a className="muted-link" href="/register">Do not have an account? Sign up</a>
              <button className="btn-primary" type="submit">Login</button>
            </form>
      </div>
    </div>
  );
}
