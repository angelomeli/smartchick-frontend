import React, { useState } from 'react';

const faqs = [
  { q: 'Comment ajouter un nouveau lot de volailles ?', r: 'Allez dans "Gestion des volailles" puis cliquez sur "Ajouter un lot" et remplissez le formulaire.' },
  { q: 'Comment configurer les alertes automatiques ?', r: 'Dans "Surveillance IoT", vous pouvez configurer les seuils d\'alerte pour chaque capteur.' },
  { q: 'Comment exporter les données en PDF ?', r: 'Allez dans "Rapports PDF", choisissez le type et la période, puis cliquez sur "Générer et télécharger PDF".' },
  { q: 'Comment ajouter un nouveau capteur ?', r: 'Depuis le Dashboard, cliquez sur "Ajouter capteur" et suivez les instructions de configuration.' },
];

function Support() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Support technique</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Bienvenue sur Smartix</p>
      </div>

      {/* Bannière */}
      <div style={{ background: '#22c55e', borderRadius: 12, padding: '24px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>❓</div>
        <div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Support technique Smartix</div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 4 }}>Nous sommes là pour vous aider 24/7</div>
        </div>
      </div>

      {/* Contacts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { icon: '✉', label: 'Email', detail: 'support@smartix.cm', action: 'Envoyer un email', color: '#3b82f6' },
          { icon: '📞', label: 'Téléphone', detail: '+237 6 23 45 67 89', action: 'Appeler maintenant', color: '#22c55e' },
          { icon: '💬', label: 'Chat en direct', detail: 'Disponible 24/7', action: 'Démarrer le chat', color: '#8b5cf6' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, background: c.color + '15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 12px' }}>{c.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{c.detail}</div>
            <button style={{ fontSize: 13, color: c.color, background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}>{c.action}</button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>Questions fréquentes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
              <div
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', background: openFaq === i ? '#f9fafb' : '#fff' }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1f2937' }}>▶ {faq.q}</span>
                <span style={{ color: '#6b7280' }}>{openFaq === i ? '▲' : '▼'}</span>
              </div>
              {openFaq === i && (
                <div style={{ padding: '12px 16px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
                  {faq.r}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Support;