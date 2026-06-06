import React, { useState } from 'react';
import { actuatorService } from '../services/api';

function ControleAuto() {
  const [modeAuto, setModeAuto] = useState(true);
  const [actionneurs, setActionneurs] = useState([
    { id: 'a-001', nom: 'Ventilation', icon: '💨', color: '#3b82f6', actif: true, details: [{ k: 'Vitesse', v: '75%' }, { k: 'Température cible', v: '24°C' }] },
    { id: 'a-003', nom: 'Pompe à eau', icon: '💧', color: '#6b7280', actif: false, details: [{ k: 'Débit', v: '0 L/min' }, { k: 'Pression', v: '0 bar' }] },
    { id: 'a-005', nom: 'Éclairage', icon: '💡', color: '#f59e0b', actif: true, details: [{ k: 'Intensité', v: '80%' }, { k: 'Horaire', v: '6h-20h' }] },
    { id: 'a-004', nom: 'Alimentation auto', icon: '🍽️', color: '#8b5cf6', actif: true, details: [{ k: 'Prochain repas', v: 'Dans 2h' }, { k: 'Quantité', v: '45 kg' }] },
  ]);

  function toggleActionneur(id) {
    setActionneurs(actionneurs.map(a => {
      if (a.id === id) {
        actuatorService.control(id, { etat: !a.actif }).catch(() => {});
        return { ...a, actif: !a.actif };
      }
      return a;
    }));
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Contrôle automatique</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Bienvenue sur Smartix</p>
      </div>

      {/* Mode automatique */}
      <div style={{ background: '#22c55e', borderRadius: 12, padding: '20px 24px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Mode de contrôle</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
            {modeAuto ? 'Le système fonctionne en mode automatique' : 'Le système fonctionne en mode manuel'}
          </div>
        </div>
        <div
          onClick={() => setModeAuto(!modeAuto)}
          style={{ width: 52, height: 28, background: modeAuto ? '#fff' : 'rgba(255,255,255,0.3)', borderRadius: 14, position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          <div style={{ position: 'absolute', top: 3, left: modeAuto ? 26 : 3, width: 22, height: 22, background: modeAuto ? '#22c55e' : '#fff', borderRadius: '50%', transition: 'left 0.3s' }}></div>
        </div>
      </div>

      {/* Actionneurs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {actionneurs.map((a) => (
          <div key={a.id} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, background: (a.actif ? a.color : '#6b7280') + '20', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937' }}>{a.nom}</div>
                  <div style={{ fontSize: 12, color: a.actif ? '#22c55e' : '#6b7280' }}>{a.actif ? 'Activée' : 'Désactivée'}</div>
                </div>
              </div>
              <div
                onClick={() => toggleActionneur(a.id)}
                style={{ width: 48, height: 26, background: a.actif ? a.color : '#d1d5db', borderRadius: 13, position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}
              >
                <div style={{ position: 'absolute', top: 3, left: a.actif ? 24 : 3, width: 20, height: 20, background: '#fff', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
              </div>
            </div>
            {a.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>{d.k}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1f2937' }}>{d.v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Historique */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>Historique des actions</h3>
        {[
          { action: 'Ventilation activée automatiquement', time: 'Il y a 5 min', color: '#22c55e' },
          { action: 'Distribution alimentation programmée', time: 'Il y a 2h', color: '#8b5cf6' },
          { action: 'Pompe à eau désactivée', time: 'Il y a 3h', color: '#6b7280' },
        ].map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f3f4f6' : 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: h.color, flexShrink: 0 }}></div>
            <div style={{ flex: 1, fontSize: 13, color: '#1f2937' }}>{h.action}</div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{h.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ControleAuto;