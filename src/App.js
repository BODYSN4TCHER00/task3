import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LCMService from './components/LCMService';

function App() {
  return (
    <Router basename="/dcumplido04_gmail_com">
      <Routes>
        <Route path="/" element={<LCMService />} />
        {/* Redirección desde la raíz absoluta */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;