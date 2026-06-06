import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Surveillance from './pages/Surveillance';
import ControleAuto from './pages/ControleAuto';
import Alertes from './pages/Alertes';
import Volailles from './pages/Volailles';
import Historique from './pages/Historique';
import Statistiques from './pages/Statistiques';
import RapportsPDF from './pages/RapportsPDF';
import Parametres from './pages/Parametres';
import Support from './pages/Support';
import Layout from './components/Layout';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="volailles" element={<Volailles />} />
          <Route path="surveillance" element={<Surveillance />} />
          <Route path="controle" element={<ControleAuto />} />
          <Route path="alertes" element={<Alertes />} />
          <Route path="historique" element={<Historique />} />
          <Route path="statistiques" element={<Statistiques />} />
          <Route path="rapports" element={<RapportsPDF />} />
          <Route path="parametres" element={<Parametres />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;