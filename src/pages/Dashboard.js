import React, { useState, useEffect } from 'react';
import { sensorService, alertService } from '../services/api';

const cards = [
  { label: 'Total volailles', value: '5,000', icon: '🐔', color: '#22c55e', badge: '+12%', status: '' },
  { label: 'Température actuelle', value: '24°C', icon: '🌡️', color: '#3b82f6', badge: 'Optimal', status: '' },
  { label: "Niveau d'eau", value: '85%', icon: '💧', color: '#06b6d4', badge: 'Normal', status: '' },
  { label: 'Niveau nourriture', value: '62%', icon: '🍽️', color: '#f97316', badge: 'Normal', status: '' },
  { label: 'Consommation J.', value: '890L', icon: '☕', color: '#8b5cf6', badge: '+5%', status: '' },
  { label: 'Alertes critiques', value: '2', icon: '⚠️', color: '#ef4444', badge: 'Urgent', status: '' },
  { label: 'Taux de mortalité', value: '0.2%', icon: '📉', color: '#22c55e', badge: 'Faible', status: '' },
  { label: 'Capteurs actifs', value: '24/25', icon: '📡', color: '#06b6d4', badge: '96%', status: '' },
];

function Dashboard() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    sensorService.getLatest('f-001').then(res => setSensors(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Bienvenue sur Smartchik</p>
      </div>

      {/* Boutons */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
          🔄 Actualiser données
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
          📥 Exporter rapport
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
          ➕ Ajouter capteur
        </button>
      </div>

      {/* Cartes métriques */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {cards.map((card, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, background: card.color + '20', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{card.icon}</div>
              <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: card.color + '15', color: card.color, fontWeight: 500 }}>{card.badge}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>{card.value}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>Température (24h)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
            {[22, 23, 24, 25, 24, 23, 24, 25, 26, 24, 23, 24].map((v, i) => (
              <div key={i} style={{ flex: 1, background: v > 25 ? '#ef4444' : '#22c55e', height: `${(v - 20) * 20}%`, borderRadius: '3px 3px 0 0', minHeight: 8 }}></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '0h', '2h', '4h'].map((h, i) => (
              <span key={i} style={{ fontSize: 9, color: '#9ca3af' }}>{h}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>Consommation hebdomadaire</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
            {[800, 950, 870, 1000, 890, 920, 860].map((v, i) => (
              <div key={i} style={{ flex: 1, background: '#3b82f6', height: `${v / 10}%`, borderRadius: '3px 3px 0 0' }}></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d, i) => (
              <span key={i} style={{ fontSize: 10, color: '#9ca3af' }}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;