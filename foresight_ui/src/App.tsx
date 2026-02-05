import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import GlobalCommand from './pages/GlobalCommand';
import TopologyInspector from './pages/TopologyInspector';
import QuantumLab from './pages/QuantumLab';
import EmbeddingInspector from './pages/EmbeddingInspector';

import InvestigationWorkspace from './pages/JuryInvestigation';

import TransactionExplorer from './pages/TransactionExplorer';
import AnalyticsReport from './pages/AnalyticsReport';
import ComplianceLog from './pages/ComplianceLog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<GlobalCommand />} />
          <Route path="analytics" element={<AnalyticsReport />} />
          <Route path="compliance" element={<ComplianceLog />} />

          <Route path="topology" element={<TopologyInspector />} />
          <Route path="embedding" element={<EmbeddingInspector />} />
          <Route path="quantum" element={<QuantumLab />} />

          {/* Explicit Routes */}
          <Route path="monitoring" element={<Navigate to="/" replace />} />
          <Route path="transactions" element={<TransactionExplorer />} />

          {/* Placeholders */}
          <Route path="investigation" element={<InvestigationWorkspace />} />
          <Route path="config" element={
            <div className="flex items-center justify-center h-full text-slate-500 font-mono">
              [ SYSTEM CONFIGURATION LOCKED BY ADMIN_01 ]
            </div>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
