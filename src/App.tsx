// src/App.tsx
import { useGameStore } from './store/gameStore';
import Landing from './pages/Landing';
import Briefing from './pages/Briefing';
import Exploration from './pages/Exploration';
import BaseBuilder from './pages/BaseBuilder'; // <-- Importação do novo módulo adicionada aqui!

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
      {currentScreen === 'landing' && <Landing />}
      {currentScreen === 'briefing' && <Briefing />}
      {currentScreen === 'exploration' && <Exploration />}
      
      {/* O placeholder foi removido e o módulo real foi ativado! */}
      {currentScreen === 'base-builder' && <BaseBuilder />}
    </main>
  );
}

export default App;