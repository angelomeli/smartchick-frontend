import React, { useState, useEffect } from 'react';
import { alertService } from '../services/api';

function Alertes() {
  const [alertes, setAlertes] = useState([
    { id: 1, type: 'ATTENTION', categorie: 'Température', message: 'Température élevée détectée - 28°C', time: 'Il y a 5 min', lu: false },
    { id: 2, type: 'CRITIQUE', categorie: 'Eau', message: "Niveau d'eau bas - 15%", time: 'Il y a 12 min', lu: false },
    { id: 3, type: 'ATTENTION', categorie: 'Alimentation', message: 'Stock nourriture faible - 22%', time: 'Il y a 30 min', lu: false },
  ]);

  function marquerLu(id) {
    setAlertes(alertes.map(a => a.id === id ? { ...a, lu: true } : a));
    alertService.acknowledge(id).catch(() => {});
  }

  function toutMarquerLu() {
    setAlertes(alertes.map(a => ({ ...a, lu: true })));
  }

  const critiques = alertes.filter(a => a.type === 'CRITIQUE').length;
  const avertissements = alertes.filter(a => a.type === 'ATTENTION').length;
  const nonLues = alertes.filter(a => !a.lu).length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Alertes</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Bienvenue sur Smartix</p>
      </div>

      {/* Boutons */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <button onClick={toutMarquerLu} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
          ✓ Tout marquer comme lu
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
          🕐 Historique alertes
        </button>
      </div>

      {/* Compteurs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: 32, color: '#ef4444', marginBottom: 8 }}>⊗</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#ef4444' }}>{critiques}</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Critiques</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: 32, color: '#f97316', marginBottom: 8 }}>⚠</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#f97316' }}>{avertissements}</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Avertissements</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: 32, color: '#3b82f6', marginBottom: 8 }}>🔔</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#3b82f6' }}>{nonLues}</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Non lues</div>
        </div>
      </div>

      {/* Liste alertes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {alertes.map(alerte => (
          <div key={alerte.id} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${alerte.type === 'CRITIQUE' ? '#ef4444' : '#f97316'}`, opacity: alerte.lu ? 0.6 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: alerte.type === 'CRITIQUE' ? '#fef2f2' : '#fff7ed', color: alerte.type === 'CRITIQUE' ? '#ef4444' : '#f97316', fontWeight: 600 }}>{alerte.type}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#1f2937' }}>{alerte.categorie}</span>
                  {!alerte.lu && <div style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }}></div>}
                </div>
                <div style={{ fontSize: 14, color: '#1f2937', marginBottom: 4 }}>{alerte.message}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{alerte.time}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => marquerLu(alerte.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 12px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 12, cursor: 'pointer', color: '#374151' }}>
                  👁 Marquer comme lu
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>
                  🔔 Notifier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alertes;