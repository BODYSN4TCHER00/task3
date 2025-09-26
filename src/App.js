import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LCMService from './components/LCMService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dcumplido04_gmail_com" element={<LCMService />} />
        <Route path="*" element={<Navigate to="/dcumplido04_gmail_com" replace />} />
      </Routes>
    </Router>
  );
}

export default App;