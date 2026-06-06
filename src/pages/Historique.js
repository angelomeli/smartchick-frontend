import React, { useState } from 'react';

function Historique() {
  const [periode, setPeriode] = useState('7j');

  const tempData = [22, 24, 23, 27, 24, 29, 26];
  const humData  = [65, 68, 62, 60, 70, 67, 64];
  const nh3Data  = [14, 16, 15, 18, 22, 20, 17];
  const jours    = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  function BarChart({ data, color, max }) {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', background: color, height: `${(v / max) * 80}px`, borderRadius: '3px 3px 0 0' }}></div>
            <span style={{ fontSize: 10, color: '#9ca3af' }}>{jours[i]}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Historique</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Données des 7 derniers jours</p>
      </div>

      {/* Sélecteur période */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['24h', '7j', '30j'].map(p => (
          <button key={p} onClick={() => setPeriode(p)} style={{ padding: '7px 16px', background: periode === p ? '#22c55e' : '#fff', color: periode === p ? '#fff' : '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: periode === p ? 600 : 400 }}>{p}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button style={{ padding: '7px 14px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>📥 Export CSV</button>
          <button style={{ padding: '7px 14px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>📄 Export PDF</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { title: 'Température (°C)', data: tempData, color: '#f97316', max: 35 },
          { title: 'Humidité relative (%)', data: humData, color: '#3b82f6', max: 100 },
          { title: 'Qualité air — NH3 (ppm)', data: nh3Data, color: '#22c55e', max: 30 },
        ].map((chart, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>{chart.title}</h3>
            <BarChart data={chart.data} color={chart.color} max={chart.max} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Historique;