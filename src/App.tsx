
import React, { useState } from 'react';
import { AppStage } from './types';
import FloatingHearts from './components/FloatingHearts';
import PuzzleGame from './components/PuzzleGame';
import LoveLetter from './components/LoveLetter';

// The "password" - can be customized by the developer
const SECRET_PASSWORD = (import.meta.env.VITE_SECRET_PASSWORD ?? "amour").toLowerCase().trim();

const FINAL_MESSAGE = `💕 Mon amour,

En vérité, je ne voulais plus d’une relation. J’étais tellement fermé… tellement pas prêt… au point même où regarder une fille m’énervait. Mon cœur était ailleurs, fatigué, distant.

Mais la grâce m’a touché… et ton sourire aussi.

Ce jour où j’ai pris cette photo, je ne savais pas que je capturais bien plus qu’un simple moment. Je rencontrais celle qui allait apaiser mon cœur. Ton sourire innocent, lumineux… c’est ce qui m’a marqué. Un sourire capable de faire oublier les soucis et d’illuminer un cœur triste.

Tu es la plus belle rencontre de mon année 2025.

Que DIEU nous guide, nous protège et bénisse ce que nous construisons.

Je t’aime profondément. ❤️`;

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LOGIN);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // You can change this to any photo URL
  const puzzleImageUrl = import.meta.env.VITE_PUZZLE_IMAGE_URL ?? "https://picsum.photos/seed/valentine/800/800";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.toLowerCase().trim() === SECRET_PASSWORD) {
      setMessage(FINAL_MESSAGE);
      setStage(AppStage.PUZZLE);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handlePuzzleComplete = () => {
    // Trigger confetti - Cast window to any to avoid TypeScript errors for dynamic properties
    if (typeof (window as any).confetti === 'function') {
      (window as any).confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#ec4899', '#db2777', '#ffffff']
      });
    }
    setStage(AppStage.MESSAGE);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-red-50">
      <FloatingHearts />
      
      <main className="z-10 w-full max-w-2xl">
        {stage === AppStage.LOGIN && (
          <div className="max-w-md mx-auto glass-morphism p-10 rounded-3xl shadow-2xl border border-white/40 animate-in slide-in-from-bottom-10 duration-1000">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-serif text-pink-700 mb-2 italic">Coucou toi...</h1>
              <p className="text-pink-600/80">Entre le petit mot secret pour continuer</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Le mot de passe..."
                  className={`w-full px-6 py-4 rounded-full bg-white/60 border-2 focus:outline-none focus:ring-4 focus:ring-pink-200 transition-all text-center text-lg ${
                    error ? 'border-red-400 shake animate-bounce' : 'border-pink-100 focus:border-pink-400'
                  }`}
                />
                {error && <p className="text-red-500 text-xs text-center mt-2 font-medium">Oups ! Ce n'est pas le bon mot secret ❤️</p>}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-pink-300/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Continuer</span>
                    <span className="group-hover:translate-x-1 transition-transform">❤️</span>
                  </>
                )}
              </button>
            </form>
            
            <p className="text-center mt-8 text-pink-300 text-sm italic">
              Indice: Le nom que je t'ai donné 
            </p>
          </div>
        )}

        {stage === AppStage.PUZZLE && (
          <div className="animate-in fade-in duration-1000">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif text-pink-800 italic">Reconstitue le puzzle 😊</h2>
            </div>
            <PuzzleGame 
              imageUrl={puzzleImageUrl} 
              gridSize={3} 
              onComplete={handlePuzzleComplete} 
            />
          </div>
        )}

        {stage === AppStage.MESSAGE && (
          <LoveLetter 
            message={message} 
            onRestart={() => setStage(AppStage.PUZZLE)} 
          />
        )}
      </main>

      {/* Credits/Footer */}
      <footer className="fixed bottom-4 left-0 right-0 text-center text-pink-300/60 text-xs uppercase tracking-widest font-semibold pointer-events-none">
        Fait avec tout mon amour • doudou
      </footer>
    </div>
  );
};

export default App;
