// src/components/AuthForms/LoginForm.jsx
// Keep all your existing form submission logic — only JSX/styles updated.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

export default function LoginForm({ onSubmit, error, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit?.({ email, password }); // wire to your existing handler
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 'var(--sp-6)', 
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #0a1428 100%)',
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Decorative glowing orbs */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        right: '-100px',
        top: '10%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91, 141, 239, 0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        left: '-50px',
        bottom: '10%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <div className="card" style={{ 
        width: '100%', 
        maxWidth: 420, 
        padding: 0, 
        position: 'relative',
        zIndex: 1,
        border: '1px solid rgba(91, 141, 239, 0.2)',
        background: 'linear-gradient(135deg, #1e293b 0%, #162031 100%)',
        boxShadow: '0 20px 60px rgba(91, 141, 239, 0.15)',
        animation: 'fadeInUp 0.8s ease-out'
      }}>
        <div style={{ padding: 'var(--sp-8)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            <div style={{ 
              width: 52, 
              height: 52, 
              borderRadius: 'var(--r-md)', 
              background: 'linear-gradient(135deg, var(--accent) 0%, #9333ea 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.4rem', 
              color: '#fff',
              fontStyle: 'italic', 
              margin: '0 auto var(--sp-4)',
              boxShadow: '0 8px 20px rgba(91, 141, 239, 0.3)'
            }}>B</div>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', color: '#f8fafc', fontWeight: 400 }}>Welcome back</h1>
            <p style={{ color: 'rgba(179, 179, 179, 0.8)', fontSize: 'var(--text-sm)' }}>Sign in to your account to continue</p>
          </div>

          {error && (
            <div style={{
              padding: 'var(--sp-3) var(--sp-4)',
              background: 'rgba(232, 93, 117, 0.1)',
              border: '1px solid rgba(232, 93, 117, 0.3)',
              borderRadius: 'var(--r-md)',
              color: '#f08a9b',
              fontSize: 'var(--text-sm)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="email" style={{ color: 'rgba(248, 250, 252, 0.8)' }}>Email address</label>
              <input 
                id="email" 
                type="email" 
                className="input-field" 
                placeholder="you@example.com"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                autoComplete="email"
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderColor: 'rgba(91, 141, 239, 0.2)',
                  color: '#f8fafc'
                }}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password" style={{ color: 'rgba(248, 250, 252, 0.8)' }}>Password</label>
              <input 
                id="password" 
                type="password" 
                className="input-field" 
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                autoComplete="current-password"
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderColor: 'rgba(91, 141, 239, 0.2)',
                  color: '#f8fafc'
                }}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                marginTop: 'var(--sp-2)',
                background: 'var(--accent)',
                boxShadow: '0 0 30px rgba(91, 141, 239, 0.4)'
              }} 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'rgba(179, 179, 179, 0.8)' }}>
            Do not have an account?{' '}
            <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 500, transition: 'all 0.2s ease' }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
