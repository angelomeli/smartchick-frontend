import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { sensorService, alertService } from '../services/api';

const FARM_ID = 'f0000000-0000-0000-0000-000000000001';

function Dashboard() {
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [tempHistory, setTempHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  async function fetchData() {
    try {
      const [sensorsRes, alertsRes] = await Promise.all([
        sensorService.getLatest(FARM_ID),
        alertService.getAll({ farm_id: FARM_ID, acknowledged: false }),
      ]);
      const sensorData = sensorsRes.data.data || [];
      setSensors(sensorData);
      setAlerts(alertsRes.data.data || []);
      setLastUpdate(new Date().toLocaleTimeString());

      const tempSensor = sensorData.find(s => s.type === 'temperature');
      if (tempSensor) {
        setTempHistory(prev => {
          const newPoint = {
            time: new Date().toLocaleTimeString(),
            temp: parseFloat(tempSensor.valeur)
          };
          const updated = [...prev, newPoint];
          return updated.slice(-10);
        });
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  function getSensorValue(type) {
    const s = sensors.find(s => s.type === type);
    return s ? `${parseFloat(s.valeur).toFixed(1)} ${s.unite}` : '--';
  }

  function getSensorStatus(type) {
    const s = sensors.find(s => s.type === type);
    if (!s) return { text: 'Aucune donnée', color: '#6b7280' };
    const val = parseFloat(s.valeur);
    if (s.seuil_max && val > s.seuil_max) return { text: '⚠ Seuil dépassé', color: '#ef4444' };
    if (s.seuil_min && val < s.seuil_min) return { text: '⚠ Niveau bas', color: '#f97316' };
    return { text: '✓ Optimal', color: '#22c55e' };
  }

  const cards = [
    { label: 'Total volailles', value: '5,000', icon: '🐔', color: '#22c55e', badge: '+12%' },
    { label: 'Température actuelle', value: getSensorValue('temperature'), icon: '🌡️', color: '#3b82f6', badge: getSensorStatus('temperature').text },
    { label: "Niveau d'eau", value: getSensorValue('water_level'), icon: '💧', color: '#06b6d4', badge: getSensorStatus('water_level').text },
    { label: 'Niveau nourriture', value: getSensorValue('food_level'), icon: '🍽️', color: '#f97316', badge: getSensorStatus('food_level').text },
    { label: 'Humidité', value: getSensorValue('humidity'), icon: '💦', color: '#8b5cf6', badge: getSensorStatus('humidity').text },
    { label: 'Alertes actives', value: alerts.length.toString(), icon: '⚠️', color: '#ef4444', badge: alerts.length > 0 ? 'Urgent' : 'Aucune' },
    { label: 'Qualité air (NH3)', value: getSensorValue('air_quality'), icon: '🌬️', color: '#22c55e', badge: getSensorStatus('air_quality').text },
    { label: 'Capteurs actifs', value: `${sensors.length}/6`, icon: '📡', color: '#06b6d4', badge: `${Math.round((sensors.length / 6) * 100)}%` },
  ];

  const weekData = [
    { jour: 'Lun', temp: 22, humidite: 65 },
    { jour: 'Mar', temp: 24, humidite: 68 },
    { jour: 'Mer', temp: 23, humidite: 62 },
    { jour: 'Jeu', temp: 27, humidite: 60 },
    { jour: 'Ven', temp: 24, humidite: 70 },
    { jour: 'Sam', temp: 29, humidite: 67 },
    { jour: 'Dim', temp: 26, humidite: 64 },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🐔</div>
          <div style={{ fontSize: 16, color: '#6b7280' }}>Chargement des données...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', margin: 0 }}>Dashboard</h1>
          <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Bienvenue sur SmartChick</p>
        </div>
        {lastUpdate && (
          <div style={{ fontSize: 12, color: '#9ca3af', background: '#f9fafb', padding: '4px 10px', borderRadius: 6 }}>
            Dernière mise à jour : {lastUpdate}
          </div>
        )}
      </div>

      {/* Boutons */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
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
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, background: card.color + '20', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{card.icon}</div>
              <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: card.color + '15', color: card.color, fontWeight: 500 }}>{card.badge}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>{card.value}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Alertes actives */}
      {alerts.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>🔔 Alertes actives</h3>
          {alerts.slice(0, 3).map((alert, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: i > 0 ? '1px solid #f3f4f6' : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: alert.alert_level === 'critical' ? '#ef4444' : '#f97316', flexShrink: 0 }}></div>
              <div style={{ flex: 1, fontSize: 13, color: '#1f2937' }}>{alert.message}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{new Date(alert.triggered_at).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      )}

      {/* Graphiques Recharts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Graphique température temps réel */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>🌡️ Température en temps réel</h3>
          {tempHistory.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#9ca3af', padding: '30px 0' }}>En attente de données...</div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={tempHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Temp (°C)" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Graphique semaine */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>📊 Température & Humidité (7 jours)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="jour" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="temp" fill="#3b82f6" name="Temp (°C)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="humidite" fill="#22c55e" name="Humidité (%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;