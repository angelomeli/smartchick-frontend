import React, { useState, useEffect } from 'react';
import { sensorService } from '../services/api';

function Surveillance() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    sensorService.getLatest('f-001').then(res => setSensors(res.data.data || [])).catch(() => {});
  }, []);

  const metrics = [
    { label: 'Température', value: '24°C', icon: '🌡️', color: '#f97316', progress: 70, plage: 'Plage: 20-26°C', status: 'Optimal' },
    { label: 'Humidité', value: '65%', icon: '💧', color: '#3b82f6', progress: 65, plage: 'Plage: 50-70%', status: 'Normal' },
    { label: "Qualité de l'air", value: 'Bonne', icon: '🌬️', color: '#22c55e', progress: 85, plage: 'CO2: 450 ppm', status: '85%' },
  ];

  const ressources = [
    { label: 'Gestion alimentation', value: '62%', icon: '🍽️', color: '#8b5cf6', details: [{ k: 'Stock restant', v: '2,480 kg' }, { k: 'Consommation journalière', v: '130 kg' }, { k: 'Autonomie', v: '19 jours', color: '#f97316' }] },
    { label: 'Gestion eau', value: '85%', icon: '💧', color: '#06b6d4', details: [{ k: 'Réservoir principal', v: '8,500 L' }, { k: 'Consommation journalière', v: '890 L' }, { k: 'Autonomie', v: '9.5 jours', color: '#22c55e' }] },
  ];

  const capteurs = [
    { nom: 'Capteur Temp #1', val: '24°C', actif: true },
    { nom: 'Capteur Temp #2', val: '23°C', actif: true },
    { nom: 'Capteur Humidité #1', val: '65%', actif: true },
    { nom: 'Capteur NH3 #1', val: '18ppm', actif: true },
    { nom: 'Capteur Eau #1', val: '85%', actif: true },
    { nom: 'Capteur Lumière #1', val: '480lux', actif: false },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Surveillance IoT</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Bienvenue sur Smartix</p>
      </div>

      {/* Métriques environnementales */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, background: m.color + '20', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{m.icon}</div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{m.label}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1f2937' }}>{m.value}</div>
              </div>
            </div>
            <div style={{ background: '#f3f4f6', borderRadius: 4, height: 6, marginBottom: 8 }}>
              <div style={{ width: `${m.progress}%`, background: m.color, height: '100%', borderRadius: 4 }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>{m.plage}</span>
              <span style={{ fontSize: 11, color: m.color, fontWeight: 500 }}>{m.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ressources */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {ressources.map((r, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, background: r.color + '20', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{r.icon}</div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{r.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#1f2937' }}>{r.value}</div>
              </div>
            </div>
            {r.details.map((d, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>{d.k}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: d.color || '#1f2937' }}>{d.v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Capteurs actifs */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>Capteurs actifs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {capteurs.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f9fafb', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.actif ? '#22c55e' : '#ef4444' }}></div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#1f2937' }}>{c.nom}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{c.val}</div>
                </div>
              </div>
              <span style={{ fontSize: 18 }}>〜</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Surveillance;