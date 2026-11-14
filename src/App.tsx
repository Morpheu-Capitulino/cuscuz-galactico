import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing'; 
import Briefing from './pages/Briefing';
import Exploration from './pages/Exploration';
import BaseBuilder from './pages/BaseBuilder'; 

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/briefing" element={<Briefing />} />
          <Route path="/exploration" element={<Exploration />} />
          
          {/* Apenas UMA declaração de rota para o Base Builder */}
          <Route path="/base-builder" element={<BaseBuilder />} /> 

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}