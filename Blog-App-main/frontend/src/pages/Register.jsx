import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../landing.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #0a1428 100%)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingTop: 'var(--sp-8)', 
      paddingBottom: 'var(--sp-8)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative glowing orbs */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        right: '-150px',
        top: '-100px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91, 141, 239, 0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        left: '-100px',
        bottom: '-50px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <div className="container" style={{ maxWidth: 'var(--container-sm)', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-12)', textAlign: 'center', animation: 'fadeInUp 0.8s ease-out' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-4)' }}>✨</div>
          <h1 className="h1" style={{ 
            marginBottom: 'var(--sp-2)',
            color: '#f8fafc',
            fontFamily: 'var(--font-display)',
            fontWeight: 400
          }}>Create Account</h1>
          <p style={{ 
            color: 'rgba(179, 179, 179, 0.8)', 
            fontSize: 'var(--text-lg)' 
          }}>
            Join our community of writers and readers
          </p>
        </div>

        {/* Form Card */}
        <div className="card" style={{ 
          padding: 'var(--sp-8)',
          border: '1px solid rgba(91, 141, 239, 0.2)',
          background: 'linear-gradient(135deg, #1e293b 0%, #162031 100%)',
          boxShadow: '0 20px 60px rgba(91, 141, 239, 0.15)',
          animation: 'fadeInUp 0.8s ease-out 0.1s backwards'
        }}>
          {error && (
            <div style={{
              padding: 'var(--sp-3) var(--sp-4)',
              background: 'rgba(232, 93, 117, 0.1)',
              border: '1px solid rgba(232, 93, 117, 0.3)',
              borderRadius: 'var(--r-md)',
              color: '#f08a9b',
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--sp-6)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
            {/* Name */}
            <div className="input-group">
              <label className="input-label" htmlFor="name" style={{ color: 'rgba(248, 250, 252, 0.8)' }}>Full Name *</label>
              <input
                id="name"
                className="input-field"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderColor: 'rgba(91, 141, 239, 0.2)',
                  color: '#f8fafc'
                }}
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label className="input-label" htmlFor="email" style={{ color: 'rgba(248, 250, 252, 0.8)' }}>Email Address *</label>
              <input
                id="email"
                className="input-field"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderColor: 'rgba(91, 141, 239, 0.2)',
                  color: '#f8fafc'
                }}
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="input-label" htmlFor="password" style={{ color: 'rgba(248, 250, 252, 0.8)' }}>Password *</label>
              <input
                id="password"
                className="input-field"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderColor: 'rgba(91, 141, 239, 0.2)',
                  color: '#f8fafc'
                }}
              />
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(128, 128, 128, 0.8)', marginTop: 'var(--sp-2)' }}>
                At least 6 characters recommended
              </p>
            </div>

            {/* Role */}
            <div className="input-group">
              <label className="input-label" htmlFor="role" style={{ color: 'rgba(248, 250, 252, 0.8)' }}>I want to be a *</label>
              <select
                id="role"
                className="input-field"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                style={{ 
                  cursor: 'pointer', 
                  appearance: 'none', 
                  paddingRight: 'var(--sp-8)',
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderColor: 'rgba(91, 141, 239, 0.2)',
                  color: '#f8fafc'
                }}
              >
                <option value="user" style={{ background: '#1e293b', color: '#f8fafc' }}>Reader</option>
                <option value="author" style={{ background: '#1e293b', color: '#f8fafc' }}>Writer/Author</option>
              </select>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(128, 128, 128, 0.8)', marginTop: 'var(--sp-2)' }}>
                Authors can publish articles. Readers can comment and save articles.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !form.name || !form.email || !form.password}
              className="btn btn-primary"
              style={{ 
                marginTop: 'var(--sp-4)',
                background: 'var(--accent)',
                boxShadow: '0 0 30px rgba(91, 141, 239, 0.4)'
              }}
            >
              {loading ? 'Creating account...' : '✨ Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', margin: 'var(--sp-6) 0', opacity: 0.5 }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(91, 141, 239, 0.2)' }}></div>
            <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(128, 128, 128, 0.8)' }}>Or</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(91, 141, 239, 0.2)' }}></div>
          </div>

          {/* Login Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(179, 179, 179, 0.8)', marginBottom: 'var(--sp-3)' }}>
              Already have an account?
            </p>
            <Link to="/login" className="btn btn-ghost" style={{ width: '100%' }}>
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;