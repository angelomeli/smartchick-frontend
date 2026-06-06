import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ width: 400, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
        <div style={{ background: '#22c55e', padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.2)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 32 }}>🐔</div>
          <div style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>SmartChick</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 }}>Ferme Avicole Connectée</div>
        </div>
        <div style={{ padding: '32px 24px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1f2937', marginBottom: 24, textAlign: 'center' }}>Connexion</h2>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: loading ? '#86efac' : '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span style={{ fontSize: 12, color: '#22c55e', cursor: 'pointer' }}>Mot de passe oublié ?</span>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 10, background: '#f3f4f6', color: '#6b7280' }}>Admin</span>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 10, background: '#dcfce7', color: '#166534' }}>Éleveur</span>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 10, background: '#f3f4f6', color: '#6b7280' }}>Observateur</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;