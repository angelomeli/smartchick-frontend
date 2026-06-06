import React, { useState } from 'react';

function Parametres() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [nom, setNom] = useState(user.nom || 'Russel');
  const [prenom, setPrenom] = useState(user.prenom || 'Teingo');
  const [email, setEmail] = useState(user.email || 'teingo@smartchick.cm');
  const [telephone, setTelephone] = useState('+237 6 12 34 56 78');
  const [ferme, setFerme] = useState('Ferme SmartChick 01');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const initiales = `${prenom?.[0] || ''}${nom?.[0] || ''}`;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Paramètres</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Bienvenue sur Smartix</p>
      </div>

      {saved && (
        <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
          ✓ Profil mis à jour avec succès !
        </div>
      )}

      {/* Profil */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 20 }}>Profil utilisateur</h3>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22, fontWeight: 700 }}>
            {initiales}
          </div>
          <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer', color: '#374151' }}>
            Changer la photo
          </button>
        </div>

        {/* Champs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>👤 Nom complet</label>
            <input value={`${prenom} ${nom}`} onChange={e => {}} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', color: '#1f2937' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>✉ Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', color: '#1f2937' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>📞 Téléphone</label>
            <input value={telephone} onChange={e => setTelephone(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', color: '#1f2937' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>🔵 Rôle</label>
            <input value={user.role || 'admin'} readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', color: '#6b7280', background: '#f9fafb' }} />
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>🏠 Ferme associée</label>
          <input value={ferme} onChange={e => setFerme(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', color: '#1f2937' }} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleSave} style={{ padding: '10px 20px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Modifier profil
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, cursor: 'pointer', color: '#374151' }}>
            🔒 Changer mot de passe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Parametres;