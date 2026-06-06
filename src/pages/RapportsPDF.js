import React, { useState } from 'react';

const rapports = [
  { nom: 'Rapport_Quotidien_2024-01-15.pdf', date: '15 Jan 2024', taille: '2.4 MB' },
  { nom: 'Rapport_Hebdomadaire_Semaine_2.pdf', date: '14 Jan 2024', taille: '5.1 MB' },
  { nom: 'Rapport_Sanitaire_Lot_B.pdf', date: '13 Jan 2024', taille: '1.8 MB' },
  { nom: 'Rapport_Mensuel_Decembre.pdf', date: '01 Jan 2024', taille: '8.2 MB' },
];

function RapportsPDF() {
  const [type, setType] = useState('Rapport quotidien');
  const [periode, setPeriode] = useState("Aujourd'hui");

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Rapports PDF</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Bienvenue sur Smartix</p>
      </div>

      {/* Générateur */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 20 }}>Générer un rapport</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>Type de rapport</label>
            <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#1f2937', background: '#fff', boxSizing: 'border-box' }}>
              <option>Rapport quotidien</option>
              <option>Rapport hebdomadaire</option>
              <option>Rapport mensuel</option>
              <option>Rapport sanitaire</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>Période</label>
            <select value={periode} onChange={e => setPeriode(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#1f2937', background: '#fff', boxSizing: 'border-box' }}>
              <option>Aujourd'hui</option>
              <option>Cette semaine</option>
              <option>Ce mois</option>
              <option>Personnalisé</option>
            </select>
          </div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
          📥 Générer et télécharger PDF
        </button>
      </div>

      {/* Rapports récents */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 20 }}>Rapports récents</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rapports.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f9fafb', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, background: '#fef2f2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📄</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1f2937' }}>{r.nom}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{r.date} • {r.taille}</div>
                </div>
              </div>
              <button style={{ padding: '7px 12px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 18, cursor: 'pointer' }}>📥</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RapportsPDF;