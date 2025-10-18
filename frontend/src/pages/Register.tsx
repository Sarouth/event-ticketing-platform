import { useState } from "react";
import { registerUser } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirm, setConfirm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm !== form.password) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await registerUser(form);
      alert("User registered successfully!");
      console.log(res.data);
    } catch (error: unknown) {
      // extract message from unknown error safely
      let msg = "Unknown error";
      if (typeof error === 'string') msg = error;
      else if (error instanceof Error) msg = error.message;
      else if (typeof error === 'object' && error !== null) {
        const eObj = error as Record<string, unknown>;
        if ('response' in eObj && typeof eObj.response === 'object' && eObj.response !== null) {
          const resp = eObj.response as Record<string, unknown>;
          if ('data' in resp) msg = String(resp.data);
          else msg = JSON.stringify(resp);
        } else {
          msg = JSON.stringify(eObj);
        }
      }
      alert("Registration failed: " + msg);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-title">Signup</div>
        <form onSubmit={handleSubmit} className="auth-fields">
          <input className="auth-input" type="text" name="username" placeholder="Name" onChange={handleChange} required />

          <input className="auth-input" type="email" name="email" placeholder="Email Address" onChange={handleChange} required />

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

          <div className="input-with-toggle">
            <input className="auth-input" type={showConfirm ? 'text' : 'password'} name="confirm" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            <button type="button" onClick={() => setShowConfirm(s => !s)} aria-label="toggle" className="toggle-eye">
              {showConfirm ? (
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

          <button className="btn-primary" type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}
