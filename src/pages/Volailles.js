import React, { useState } from 'react';

const lots = [
  { id: 1, nom: 'Lot A - Poules pondeuses', statut: 'Bonne santé', statusColor: '#22c55e', nombre: 1500, age: '8 semaines', repas: 'Il y a 2h', etat: 'Actif' },
  { id: 2, nom: 'Lot B - Poulets de chair', statut: 'Bonne santé', statusColor: '#22c55e', nombre: 2300, age: '5 semaines', repas: 'Il y a 1h', etat: 'Actif' },
  { id: 3, nom: 'Lot C - Poules pondeuses', statut: 'Attention', statusColor: '#f97316', nombre: 1200, age: '12 semaines', repas: 'Il y a 3h', etat: 'Actif' },
];

const sante = [
  { label: 'Excellente', pct: 75, color: '#22c55e' },
  { label: 'Bonne', pct: 20, color: '#86efac' },
  { label: 'Attention', pct: 4, color: '#f97316' },
  { label: 'Critique', pct: 1, color: '#ef4444' },
];

function PieChart() {
  let cumul = 0;
  const r = 80;
  const cx = 120, cy = 100;
  const segments = sante.map(s => {
    const start = cumul;
    cumul += s.pct;
    const startAngle = (start / 100) * 360 - 90;
    const endAngle = (cumul / 100) * 360 - 90;
    const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180);
    const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180);
    const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180);
    const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180);
    const large = s.pct > 50 ? 1 : 0;
    return { ...s, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z` };
  });
  return (
    <svg width="240" height="200">
      {segments.map((s, i) => <path key={i} d={s.d} fill={s.color} />)}
      {sante.map((s, i) => (
        <text key={i} x={170} y={60 + i * 22} fontSize="12" fill="#374151">
          <tspan fill={s.color}>■ </tspan>{s.label} {s.pct}%
        </text>
      ))}
    </svg>
  );
}

function Volailles() {
  const [showAjouter, setShowAjouter] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Gestion des volailles</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Bienvenue sur Smartix</p>
      </div>

      {/* Boutons */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <button onClick={() => setShowAjouter(!showAjouter)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
          ➕ Ajouter un lot
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
          📅 Programmer alimentation
        </button>
      </div>

      {/* Formulaire ajout */}
      {showAjouter && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #22c55e' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Nouveau lot</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label style={{ fontSize: 12, color: '#6b7280' }}>Nom du lot</label><input placeholder="Lot D - ..." style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, marginTop: 4, boxSizing: 'border-box' }} /></div>
            <div><label style={{ fontSize: 12, color: '#6b7280' }}>Nombre</label><input type="number" placeholder="1000" style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, marginTop: 4, boxSizing: 'border-box' }} /></div>
            <div><label style={{ fontSize: 12, color: '#6b7280' }}>Âge</label><input placeholder="4 semaines" style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, marginTop: 4, boxSizing: 'border-box' }} /></div>
            <div><label style={{ fontSize: 12, color: '#6b7280' }}>Type</label>
              <select style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, marginTop: 4, boxSizing: 'border-box' }}>
                <option>Poules pondeuses</option>
                <option>Poulets de chair</option>
              </select>
            </div>
          </div>
          <button style={{ marginTop: 12, padding: '8px 20px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>Enregistrer</button>
        </div>
      )}

      {/* Liste des lots */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {lots.map(lot => (
          <div key={lot.id} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#1f2937' }}>{lot.nom}</span>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: lot.statusColor + '20', color: lot.statusColor, fontWeight: 500 }}>{lot.statut}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  <div><div style={{ fontSize: 11, color: '#9ca3af' }}>Nombre</div><div style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{lot.nombre}</div></div>
                  <div><div style={{ fontSize: 11, color: '#9ca3af' }}>Âge</div><div style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{lot.age}</div></div>
                  <div><div style={{ fontSize: 11, color: '#9ca3af' }}>Dernier repas</div><div style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{lot.repas}</div></div>
                  <div><div style={{ fontSize: 11, color: '#9ca3af' }}>État</div><div style={{ fontSize: 14, fontWeight: 600, color: '#22c55e' }}>{lot.etat}</div></div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
                <button style={{ padding: '7px 14px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>👁 État sanitaire</button>
                <button style={{ padding: '7px 10px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>✏️</button>
                <button style={{ padding: '7px 10px', background: '#fff', border: '1px solid #fecaca', borderRadius: 8, fontSize: 14, cursor: 'pointer', color: '#ef4444' }}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Distribution de santé */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>Distribution de santé</h3>
        <PieChart />
      </div>
    </div>
  );
}

export default Volailles;