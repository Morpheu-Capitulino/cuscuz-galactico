// src/App.tsx
import { useGameStore } from './store/gameStore';
import Landing from './pages/Landing';
import Briefing from './pages/Briefing';

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
      {currentScreen === 'landing' && <Landing />}
      
      {currentScreen === 'briefing' && <Briefing />}
      
      {currentScreen === 'exploration' && (
        <div className="flex items-center justify-center h-screen bg-slate-900">
          <h1 className="text-2xl text-blue-400 font-bold animate-pulse">
            Módulo de Exploração: Próximo passo!
          </h1>
        </div>
      )}
    </main>
  );
}

export default App;