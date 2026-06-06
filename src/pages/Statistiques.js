import React from 'react';

function Statistiques() {
  const stats = [
    { label: 'Taux de survie', value: '99.8%', color: '#22c55e', icon: '📈' },
    { label: 'Production oeufs/jour', value: '1,250', color: '#3b82f6', icon: '🥚' },
    { label: 'Consommation eau/jour', value: '890 L', color: '#06b6d4', icon: '💧' },
    { label: 'Consommation aliment/jour', value: '130 kg', color: '#f97316', icon: '🌾' },
    { label: 'Coût journalier', value: '45,000 F', color: '#8b5cf6', icon: '💰' },
    { label: 'Rentabilité', value: '+12%', color: '#22c55e', icon: '📊' },
  ];

  const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const production = [1100, 1150, 1200, 1180, 1250, 1300, 1280, 1250, 1220, 1260, 1300, 1350];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Statistiques</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Analyse des performances</p>
      </div>

      {/* Cartes stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, background: s.color + '20', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{s.label}</div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Graphique production annuelle */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>Production annuelle (oeufs/jour)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
          {production.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', background: '#22c55e', height: `${(v / 1400) * 120}px`, borderRadius: '3px 3px 0 0' }}></div>
              <span style={{ fontSize: 9, color: '#9ca3af' }}>{mois[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tableau récapitulatif */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>Récapitulatif mensuel</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Mois', 'Production', 'Mortalité', 'Consommation eau', 'Consommation aliment', 'Rentabilité'].map((h, i) => (
                <th key={i} style={{ padding: '10px 12px', textAlign: 'left', color: '#6b7280', fontWeight: 500, borderBottom: '1px solid #e5e7eb' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Janvier', '1,100 oeufs', '0.1%', '26,700 L', '3,900 kg', '+10%'],
              ['Février', '1,150 oeufs', '0.2%', '24,920 L', '3,640 kg', '+11%'],
              ['Mars', '1,200 oeufs', '0.1%', '27,590 L', '4,030 kg', '+13%'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '10px 12px', color: j === 5 ? '#22c55e' : '#1f2937', fontWeight: j === 5 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Statistiques;