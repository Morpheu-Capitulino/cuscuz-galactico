import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
      <h1 className="text-slate-400 text-xl mb-6">Tela inicial (Frontend em construção pelo amigo)</h1>
      
      <button 
        onClick={() => navigate('/briefing')}
        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg"
      >
        Pular para o Jogo (Testar Briefing)
      </button>
    </div>
  );
}