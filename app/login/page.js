'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        {/* Decorative elements */}
        <div className="auth-glow auth-glow-1"></div>
        <div className="auth-glow auth-glow-2"></div>
        
        {/* Logo area */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" fill="url(#logoGrad)" opacity="0.2" stroke="url(#logoGrad)" strokeWidth="2"/>
              <path d="M14 18L18 22L26 14" stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <h1 className="gradient-text" style={{ fontSize: '1.75rem', fontWeight: 800 }}>Pitch Polisher</h1>
          <p className="muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
            AI-powered startup pitch analysis
          </p>
        </div>

        {/* Toggle tabs */}
        <div className="auth-tabs">
          <button 
            type="button"
            className={`auth-tab ${isLogin ? 'active' : ''}`} 
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`auth-tab ${!isLogin ? 'active' : ''}`} 
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            Sign Up
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="auth-error slide-up">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 4h2v5H7V4zm0 6h2v2H7v-2z"/>
            </svg>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.5rem', opacity: 0.6 }}>
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z"/>
              </svg>
              Username
            </label>
            <input 
              id="username"
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Enter your username"
              required 
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '0.5rem', opacity: 0.6 }}>
                <path d="M5 4.5A2.5 2.5 0 0 1 10 4.5v2h1a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h1v-2zm2.5-1a1.5 1.5 0 0 0-1.5 1.5v2h3v-2a1.5 1.5 0 0 0-1.5-1.5z"/>
              </svg>
              Password
            </label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required 
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>
          <button 
            type="submit" 
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem 1.25rem' }} 
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span className="spinner-dots">
                  <span></span><span></span><span></span>
                </span>
                Processing...
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary)', 
              cursor: 'pointer', 
              padding: 0, 
              fontSize: 'inherit',
              fontWeight: 600,
              boxShadow: 'none'
            }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
