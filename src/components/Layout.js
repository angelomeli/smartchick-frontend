import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const menuItems = [
  { path: '/dashboard',    label: 'Dashboard',            icon: '▣' },
  { path: '/volailles',    label: 'Gestion des volailles', icon: '🐔' },
  { path: '/surveillance', label: 'Surveillance IoT',      icon: '📡' },
  { path: '/controle',     label: 'Contrôle automatique',  icon: '⚡' },
  { path: '/alertes',      label: 'Alertes',               icon: '🔔' },
  { path: '/historique',   label: 'Historique',            icon: '📅' },
  { path: '/statistiques', label: 'Statistiques',          icon: '📊' },
  { path: '/rapports',     label: 'Rapports PDF',          icon: '📄' },
  { path: '/parametres',   label: 'Paramètres',            icon: '⚙' },
  { path: '/support',      label: 'Support technique',     icon: '❓' },
];

function Layout() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleLogout() {
    setShowModal(true);
  }

  function confirmerDeconnexion() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>

      {/* Modal de déconnexion */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 380, boxShadow: '0 25px 50px rgba(0,0,0,0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚪</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f2937', marginBottom: 8 }}>Déconnexion</h2>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>Voulez-vous vraiment vous déconnecter de SmartChick ?</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: '10px 28px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
              >
                Non, rester
              </button>
              <button
                onClick={confirmerDeconnexion}
                style={{ padding: '10px 28px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
              >
                Oui, déconnecter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div style={{ width: 210, background: '#1a1a2e', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #2d2d44' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#22c55e', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🐔</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>SmartChick</div>
              <div style={{ color: '#9ca3af', fontSize: 11 }}>Ferme Avicole Connectée</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px', textDecoration: 'none',
                color: isActive ? '#fff' : '#9ca3af',
                background: isActive ? '#22c55e' : 'transparent',
                borderRadius: isActive ? 8 : 0,
                margin: isActive ? '2px 8px' : '1px 0',
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s',
              })}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.path === '/alertes' && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 11 }}>3</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '12px 8px', borderTop: '1px solid #2d2d44' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 16px', background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 13, borderRadius: 8 }}>
            <span>🚪</span> Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: 210, flex: 1, background: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ background: '#fff', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }}></div>
            <span style={{ fontSize: 13, color: '#6b7280' }}>Système actif</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <span style={{ fontSize: 20 }}>🔔</span>
              <span style={{ position: 'absolute', top: -4, right: -4, background: '#ef4444', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            </div>
            <div style={{ width: 36, height: 36, background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 14 }}>
              {user.prenom?.[0]}{user.nom?.[0]}
            </div>
          </div>
        </div>
        <div style={{ padding: 24 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;